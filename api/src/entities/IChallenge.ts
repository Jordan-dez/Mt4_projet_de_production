export interface IChallenge{
    uuid:number;
    name:string;
    creatorUuid:number;
    status:string;
    total:number;
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IChallengeORM {
    uuid:number;
    name:string;
    creator_uuid:number;
    status:string;
    total:number;
    created_at: Date;
    updated_at: Date|null;
}

export type IChallengeRO=Readonly<IChallenge>
export type IChallengeCreate=Omit<IChallenge,'uuid'|'createdAt'|'updatedAt'|'creatorUuid'|'total'|'status'>
export type IChallengeUpdate=Partial<IChallenge>