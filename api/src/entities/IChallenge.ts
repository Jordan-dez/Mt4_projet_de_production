import { IQuestionsCreate } from "./IQuestion";

export interface IChallenge{
    uuid:string;
    name:string;
    creatorUuid:string;
    status:string;
    total:number;
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IChallengeORM {
    uuid:string;
    name:string;
    creator_uuid:string;
    status:string;
    total:number;
    created_at: Date;
    updated_at?: Date|null;
}

export type IChallengeRO=Readonly<IChallenge>
export type IChallengeCreate=Omit<IChallenge,'uuid'|'createdAt'|'updatedAt'|'creatorUuid'|'total'|'status'>
export type IChallengeUpdate=Partial<IChallenge>
export interface IChallengeRequestBody {
    name:IChallengeCreate['name'];
    questions: IQuestionsCreate[];
}