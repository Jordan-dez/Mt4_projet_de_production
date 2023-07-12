import { Router } from "express";
import { Body, Get, Put, Query, Route } from "tsoa";
import { BadRequestError } from "../errors/BadRequestError";
import { Crud } from "../services/Crud";
import { Email } from "../services/Email";
import { JWT } from "../services/JWT";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { IUser, IUserORM, IUserORMUpdate, IUserOrmCreate, IUserRO } from "../entities/IUser";
import { Roles } from "../entities/types/Roles.enum";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "../errors/NotFoundError";
import { IChallengeRO } from "../entities/IChallenge";
import { IResultORMCreate, IResultRO } from "../entities/IResult";
import { Repository } from "../database/repository/Repository";

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
        });
        
        if(null === challenge) {
            throw new NotFoundError(challengeUuid);
        }

        let user: IUserRO|null = null;

        user = await Crud.Read<IUserRO>({
            table: 'users',
            idKey: 'email',
            idValue: email,
            columns: ['uuid', 'email', 'role']
        }) as IUserRO;

        if(null === user) {
            user = {
                uuid: uuid(),
                email: email,
                createdAt: new Date()
            }

            await Crud.Create<IUserORM>({
                table: 'users',
                body: {
                    uuid: user.uuid,
                    email: user.email,
                    created_at: user.createdAt
                }
            });
        }

        const user_challenge_result: IResultRO = {
            userUuid: user.uuid,
            challengeUuid,
            createdAt: new Date(),
        };

        const result = await Repository.GetResultByUserAndChallenge(user.uuid, challengeUuid);
        
        if (null === result) {
            await Crud.Create<IResultORMCreate>({
                body: {
                    challenge_uuid: user_challenge_result.challengeUuid,
                    user_uuid: user_challenge_result.userUuid,
                    created_at: new Date()
                },
                table: 'results'
            });
        }

        await this.processSendingMagicLink(email);

        return {ok: true}
    }

    @Get('/login')
    public async login(
        @Query() token: string
    ): Promise<Partial<IUser> & {jwt: string, admin: boolean}>
    {
        if(!token) {
            throw new BadRequestError('Token is missing in login request.');
        }
        
        const helper = new JWT();

        const user = await Crud.Read<IUserRO>({
            table: 'users',
            idKey: 'token',
            idValue: token,
            columns: ['uuid', 'token', 'email', 'role', 'firstname', 'lastname']
        });

        if(user == null) {
            throw new NotFoundError();
        }

        let payload = {
            userUuid: user.uuid,
            amdin: user.role === Roles.ADMIN
        };

        const access = await helper.create(payload, {
            expiresIn: "12 hours",
            issuer: ISSUER,
            audience: ACCESS_AUD
        }) as string;

        await Crud.Update<IUserORMUpdate>({
            body: {
                token: null
            },
            table: 'users',
            idKey: 'token',
            idValue: token
        })
    
        return {
            uuid: user.uuid,
            firstname: user.firstname,
            lastname: user.lastname,
            admin: user.role === Roles.ADMIN,
            jwt: access
        };
    }

    @Put('/user')
    public async createStudentProfile(
        @Body() body: IUserOrmCreate
    ): Promise<{ok: boolean}>
    {
        const userUuid = '';
        const {firstname, lastname} = body;

        await Crud.Update<IUserORMUpdate>({
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

        await Crud.Update<IUserORMUpdate>({
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
