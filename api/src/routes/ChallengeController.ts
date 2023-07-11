import { Body, Post, Route } from "tsoa";
import { IChallengeORM, IChallengeRO, IChallengeRequestBody } from "../entities/IChallenge";
import { Crud } from "../services/Crud";
import { v4 as uuid } from "uuid";
import { IQuestionsORM } from "../entities/IQuestion";


@Route("/challenge")
export class ChallengeController {
    @Post("/")
    public async create(@Body() body: IChallengeRequestBody): Promise<{ok: boolean}>
    {
        try {
            const {name, questions} = body;

            const challenge: IChallengeRO = {
                uuid: uuid(),
                name,
                creatorUuid: uuid(),
                status: 'pending',
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
                        note:question.value,
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

    
}