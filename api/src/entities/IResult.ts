export interface IResult {
    challengeUuid:string;
    userUuid:string;
    createdAt: Date;
    grade?:number;
    stepsValidated?:number;
    serverUsername?: string;
    serverIpAddress?: string;
    updatedAt?: Date|null;
}

export interface IResultORM {
    challenge_uuid:string;
    user_uuid:string;
    created_at: Date;
    grade?:number;
    steps_validated?:number;
    server_username?: string;
    server_ip_address?: string;
    updated_at?: Date|null;
}

export type IResultRO = Readonly<IResult>
export type IResultCreate = Pick<IResult,'challengeUuid'>
export type IResultORMCreate = Omit<IResultORM,'updated_at'>
export type IResultORMUpdate = Partial<IResultORM>
export type IResultORMRO = Readonly<IResultORM>
export type IResultORMDelete = Pick<IResultORM,'challenge_uuid'|'user_uuid'>
