import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { IResultORM } from "../../entities/IResult";
import { IUpdateResponse } from "../../entities/types/IUpdateResponse";
import { DBConfig } from "../db.config";
import { IChallengeWithQuestions, IChallengeWithQuestionsResult } from "../../entities/IChallenge";

export class Repository {
    private static db: Pool = DBConfig.Connection;

    public static async UpdateResultByUserAndChallenge(
        userUuid: string,
        challengeUuid: string,
        updates: Partial<IResultORM>
    ): Promise<IUpdateResponse> 
    {
        const query = `
            UPDATE results SET ? WHERE user_uuid = ? AND challenge_uuid = ?
        `;
        const data = await this.db.query<OkPacket>(query, [updates, userUuid, challengeUuid]);
        
        return {
            id: `${userUuid}-${challengeUuid}`,
            rows: data[0].affectedRows
        };
    }

    public static async GetResultByUserAndChallenge(
        userUuid: string,
        challengeUuid: string
      ): Promise<IResultORM|null> {
        const query = `
            SELECT * FROM results WHERE user_uuid = ? AND challenge_uuid = ?
        `;
        const data = await this.db.query<IResultORM[] & RowDataPacket[]>(query, [userUuid, challengeUuid]);
        
        if (data[0].length > 0) {
            return data[0][0];
        } else {
            return null;
        }
    }

    public static async GetChallengeWithQuestions(challengeUuid: string): Promise<IChallengeWithQuestions|null> {
        const query = `
            SELECT c.uuid, c.name, c.description, c.creator_uuid AS creatorUuid, c.status, c.total, q.id, q.question, q.expected_answer AS expectedAnswer, q.command, q.note
            FROM challenges c
            LEFT JOIN questions q ON c.uuid = q.challenge_uuid
            WHERE c.uuid = ?
        `;
        const data = await this.db.query<IChallengeWithQuestionsResult[] & RowDataPacket[]>(query, [challengeUuid]);
    
        if (data[0].length > 0) {
            const challenge: IChallengeWithQuestions = {
                uuid: data[0][0].uuid,
                name: data[0][0].name,
                description: data[0][0].description,
                creatorUuid: data[0][0].creatorUuid,
                status: data[0][0].status,
                total: data[0][0].total,
                questions: data[0].map((row) => ({
                    id: row.id,
                    question: row.question,
                    expectedAnswer: row.expectedAnswer,
                    command: row.command,
                    note: row.note
                }))
            };
            return challenge;
        } else {
            return null;
        }
    }
    
}