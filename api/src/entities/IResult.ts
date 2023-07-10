export interface IResult {
    challengeUuid:number;
    userUuid:number;
    createdAt: Date;
    grade?:number;
    stepsValidated?:number;
    serverUsername?: string;
    serverIpAddress?: string;
    updatedAt?: Date|null;
}

export interface IResultORM {
    challenge_uuid:number;
    user_uuid:number;
    created_at: Date;
    grade?:number;
    steps_validated?:number;
    server_username?: string;
    server_ip_address?: string;
    updated_at?: Date|null;
}

export type IResultRO = Readonly<IResult>
export type IResultORMCreate = Omit<IResultORM,'updated_at'>
export type IResultORMUpdate = Partial<IResultORM>
export type IResultORMRO = Readonly<IResultORM>
export type IResultORMDelete = Pick<IResultORM,'challenge_uuid'|'user_uuid'>