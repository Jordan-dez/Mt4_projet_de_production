import { Router } from "express";
import { Body, Get, Post, Query, Route } from "tsoa";
import { BadRequestError } from "../errors/BadRequestError";
import { Crud } from "../services/Crud";
import { Email } from "../services/Email";
import { JWT } from "../services/JWT";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { IUser, IUserORM, IUserProfileCreate, IUserRO, IUserUpdate } from "../entities/IUser";
import { Roles } from "../entities/types/Roles.enum";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "../errors/NotFoundError";
import { IChallengeRO } from "../entities/IChallenge";

export const ISSUER = "api-auth";
export const MAGIC_AUD = "api-magic"
export const ACCESS_AUD = "api-access";
export const RENEW_AUD = "api-renew";

const router = Router({mergeParams: true});

@Route('/auth')
export class AuthController {
    private emailer: Email;

    constructor() {
        this.emailer = new Email();
    }

    @Get("/magic-link-admin")
    public async sendAdminMagicLink(@Query() email: string): Promise<any>
    {
        if(!email) {
            throw new BadRequestError('Email is missing in magic link request.');
        }

        const user = await Crud.Read<IUserRO>({
            table: 'users',
            idKey: 'email',
            idValue: email,
            columns: ['uuid', 'email', 'role']
        }) as IUser;

        if(Roles.ADMIN !== user.role) {
            throw new NotAuthorizedError('User is not admin');
        }

        await this.processSendingMagicLink(email);

        return {ok: true}
    }

    @Get("/magic-link-student")
    public async sendStudentMagicLink(
        @Query() email: string,
        @Query() challengeUuid: string,
        @Query() challengeName: string
    ): Promise<any>
    {
        if(!email || !challengeName || !challengeUuid) {
            throw new BadRequestError('Data is missing in magic link request.');
        }

        const challenge = await Crud.Read<IChallengeRO>({
            table: 'challenges',
            idKey: 'uuid',
            idValue: challengeUuid,
            columns: ['uuid', 'name']
        }) as IChallengeRO;

        if(null === challenge) {
            throw new NotFoundError(challengeUuid);
        }

        const foundUser = await Crud.Read<IUserRO>({
            table: 'users',
            idKey: 'email',
            idValue: email,
            columns: ['uuid', 'email', 'role']
        });

        if(null === foundUser) {
            await Crud.Create<IUserORM>({
                table: 'users',
                body: {
                    uuid: uuid(),
                    email,
                    created_at: new Date()
                }
            });
        }

        await this.processSendingMagicLink(email);

        return {ok: true}
    }

    @Get('/login')
    public async login(
        @Query() token: string
    ): Promise<{access: string, renew: string, redirectTo: string, message: string}>
    {
        if(!token) {
            throw new BadRequestError('Token is missing in login request.');
        }
        
        const helper = new JWT();

        const user = await Crud.Read<IUserRO>({
            table: 'users',
            idKey: 'token',
            idValue: token,
            columns: ['uuid', 'token', 'email']
        });

        if(user == null) {
            throw new NotFoundError();
        }

        let payload = {
            userId: user.uuid,
            amdin: user.role === Roles.ADMIN
        };

        const access = await helper.create(payload, {
            expiresIn: "12 hours",
            issuer: ISSUER,
            audience: ACCESS_AUD
        }) as string;

        const renew = await helper.create(payload, {
            expiresIn: "1 week",
            issuer: ISSUER,
            audience: RENEW_AUD
        }) as string;

        /**
         * Supprimer le token de la BDD
         */
        await Crud.Update<IUserUpdate>({
            body: {
                token: null
            },
            table: 'users',
            idKey: 'token',
            idValue: token
        })

    
        return {
            access: access,
            renew: renew,
            redirectTo: 'https://lien.vers.mon.front',
            message: 'Endpoint d\'accès aux resources'
        };
    }

    @Post('/profile')
    public async createStudentProfile(
        @Body() body: IUserProfileCreate
    ): Promise<{ok: boolean}>
    {
        const userUuid = '';
        const {firstname, lastname} = body;

        await Crud.Update<IUserUpdate>({
            body: {
                firstname,
                lastname
            },
            table: 'users',
            idKey: 'uuid',
            idValue: userUuid
        })

        return {ok: true}
    }    

    private async processSendingMagicLink(email: string) {

        const token  = uuid().toString();
        const link = process.env.FRONT_URL || 'http://localhost:' + '/magic-link-login?token=' + token;

        await Crud.Update<IUserUpdate>({
            body: {
                token: token
            },
            table: 'users',
            idKey: 'email',
            idValue: email
        })

        await this.emailer.sendMagicLink(email, link, 'Mon Service');
    }
}
