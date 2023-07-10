import { ChallengeStatus } from "./types/ChallengeStatus.enum";

export interface IChallenge {
    uuid:number;
    name:string;
    creatorUuid:number;
    createdAt: Date;
    description?:string;
    status?:ChallengeStatus;
    total?:number;
    updatedAt?: Date|null;
}

export interface IChallengeORM {
    uuid:number;
    name:string;
    creator_uuid:number;
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