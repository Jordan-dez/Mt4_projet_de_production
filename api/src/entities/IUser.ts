import { Roles } from "./types/Roles.enum";

export interface IUser {
    uuid: string;
    email: string;
    password?: string;
    firstname: string;
    lastname: string;
    roles: Roles[];
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IUserORM {
    uuid: string;
    email: string;
    password?: string;
    firstname: string;
    lastname: string;
    roles: string;
    created_at: Date;
    updated_at?: Date|null;
}

export type IUserRO = Readonly<IUser>;
export type IQuestionsCreate = Omit<IUser,'uuid'|'challengeId'|'roles'|'createdAt'|'updatedAt'>
export type IQuestionsUpdate=Partial<IUser>