import { Roles } from "./types/Roles.enum";

export interface IUser {
    uuid: string;
    email: string;
    firstname?: string;
    lastname?: string;
    role?: Roles;
    token?: string|null;
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IUserORM {
    uuid: string;
    email: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    token?: string|null;
    created_at: Date;
    updated_at?: Date|null;
}

export type IUserRO = Readonly<IUser>;
export type IUserCreate = Omit<IUser,'uuid'|'challengeId'|'roles'|'createdAt'|'updatedAt'>
export type IUserUpdate=Partial<IUserORM>
export type IUserProfileCreate=Pick<IUser, 'firstname'|'lastname'>