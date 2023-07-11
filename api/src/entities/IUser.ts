import { Roles } from "./types/Roles.enum";

export interface IUser {
    uuid: string;
    email: string;
    createdAt: Date;
    firstname?: string;
    lastname?: string;
    role?: Roles;
    token?: string;
    updatedAt?: Date|null;
}

export interface IUserORM {
    uuid: string;
    email: string;
    created_at: Date;
    firstname?: string;
    lastname?: string;
    role?: Roles;
    token?: string|null;
    updated_at?: Date|null;
}

export type IUserRO = Readonly<IUser>;
export type IUserORMUpdate = Partial<IUserORM>;
export type IUserOrmRO = Readonly<IUserORM>;
export type IUserOrmCreate = Omit<IUserORM,|'updated_at'>;
export type IUserORMDelete = Pick<IUserORM,'uuid'>;
