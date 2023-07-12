import { Body, Get, Path, Post, Request, Res, Route, Security, TsoaResponse } from "tsoa";
import { IChallengeORM, IChallengeORMCreate, IChallengeRO, IChallengeRequestBody } from "../../entities/IChallenge";
import { Crud } from "../../services/Crud";
import { v4 as uuid } from "uuid";
import { IQuestionsCreate, IQuestionsORM } from "../../entities/IQuestion";
import { ChallengeStatus } from "../../entities/types/ChallengeStatus.enum";
import { IResultCreate, IResultORMCreate, IResultRO } from "../../entities/IResult";
import { NotFoundError } from "../../errors/NotFoundError";
import { Repository } from "../../database/repository/Repository";

const ADMIN_UUID = 'd0db4f33-473d-4696-9bf5-1ffff4b47537';

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
                description,
                creatorUuid: uuid(),
                status: ChallengeStatus.OPENED,
                total: 12,
                createdAt: new Date()
            }

            await Crud.Create<Readonly<IChallengeORM>>({
                body: {
                    uuid: challenge.uuid,
                    name: challenge.name,
                    creator_uuid: ADMIN_UUID,
                    status: challenge.status,
                    total: this.getChallengeTotal(questions),
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
        const challenge = await Repository.GetChallengeWithQuestions(uuid);

        if (null === challenge) {
            throw new NotFoundError(uuid);
        }

        return challenge;
    }

    private getChallengeTotal(questions: IQuestionsCreate[]) {
        return questions.reduce((total, question) => total + question.note!, 0);
    }
}
