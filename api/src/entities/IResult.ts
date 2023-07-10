export interface DatabaseCredentials {
    token:string
}
export interface IResults {
    challengeUuid:number;
    userUuid:number;
    grade:number;
    stepsValidated:number;
    databaseCredentials:DatabaseCredentials
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IResultsORM {
    challenge_uuid:number;
    user_uuid:number;
    grade:number;
    steps_validated:number;
    database_credentials:DatabaseCredentials,
    created_at: Date;
    updated_at: Date|null;
}

export type IResultsRO = Readonly<IResults>