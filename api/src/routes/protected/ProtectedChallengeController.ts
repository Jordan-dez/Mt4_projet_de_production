import { Body, Get, Path, Post, Request, Res, Route, Security, TsoaResponse } from "tsoa";
import { IChallengeORM, IChallengeORMCreate, IChallengeRO, IChallengeRequestBody } from "../../entities/IChallenge";
import { Crud } from "../../services/Crud";
import { v4 as uuid } from "uuid";
import { IQuestionsORM } from "../../entities/IQuestion";
import { ChallengeStatus } from "../../entities/types/ChallengeStatus.enum";
import { IResultCreate, IResultORMCreate, IResultRO } from "../../entities/IResult";

@Route("/protected/challenge") 
@Security('jwt', ['Admin'])
export class ChallengeController {
    @Post("/")
    public async create(@Body() body: IChallengeRequestBody): Promise<{ok: boolean}>
    {
        try {
            const {name, description, questions} = body;

            const challenge: IChallengeRO = {
                uuid: uuid(),
                name,
                creatorUuid: uuid(),
                status: ChallengeStatus.OPENED,
                total: 12,
                createdAt: new Date()
            }

            await Crud.Create<Readonly<IChallengeORM>>({
                body: {
                    uuid: challenge.uuid,
                    name: challenge.name,
                    creator_uuid: 'd0db4f33-473d-4696-9bf5-1ffff4b47537',
                    status: challenge.status,
                    total: challenge.total,
                    created_at: challenge.createdAt
                },
                table: 'challenges'
            })

            const promises = questions.map(async (question) => {
                await Crud.Create<IQuestionsORM>({
                    body: {
                        challenge_uuid:challenge.uuid,
                        question:question.question,
                        expected_answer:question.expectedAnswer,
                        command:question.command,
                        note:question.note,
                        created_at: new Date()
                    },
                    table: 'questions'
                });
            });

            await Promise.all(promises);
            
            return {ok: true}

        } catch (error) {
            throw error;
        }
    }

    @Get('/{uuid}')
    public async get(@Path() uuid: string): Promise<any>
    {
        const challenge = await Crud.Read<IChallengeRO>({
            table: 'challenges',
            idKey: 'uuid',
            idValue: uuid,
            columns: ['uuid', 'name', `creator_uuid as creatorUuid`, 'description', 'status', 'total']
        });

        return challenge;
    }

    @Post('/result')
    public async initializeStudentResult(@Body() body: IResultCreate, @Request() req: any): Promise<{ok: boolean}|any>
    {
        const {challengeUuid} = body;
        const { userUuid } = req.res.locals;
        const user_challenge_result: IResultRO = {
            userUuid,
            challengeUuid,
            createdAt: new Date(),
        }

        await Crud.Create<IResultORMCreate>({
            body: {
                challenge_uuid: user_challenge_result.challengeUuid,
                user_uuid: user_challenge_result.userUuid,
                created_at: new Date()
            },
            table: 'results'
        })

        return {ok: true};
    }
}