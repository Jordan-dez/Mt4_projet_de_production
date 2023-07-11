import { IQuestionsCreate } from "./IQuestion";
import { ChallengeStatus } from "./types/ChallengeStatus.enum";

export interface IChallenge {
    uuid:string;
    name:string;
    creatorUuid:string;
    createdAt: Date;
    description?:string;
    status?:ChallengeStatus;
    total?:number;
    updatedAt?: Date|null;
}

export interface IChallengeORM {
    uuid:string;
    name:string;
    creator_uuid:string;
    created_at: Date;
    description?:string;
    status?:ChallengeStatus;
    total?:number;
    updated_at?: Date|null;
}

export type IChallengeRO = Readonly<IChallenge>
export type IChallengeORMCreate = Omit<IChallengeORM,'updated_at'>
export type IChallengeORMUpdate = Partial<IChallengeORM>
export type IChallengeORMRO = Readonly<IChallengeORM>
export type IChallengeORMDelete = Pick<IChallengeORM,'uuid'>
export type IChallengeRequestBody = Pick<IChallenge, 'name'|'description'> & {questions: IQuestionsCreate[]}
