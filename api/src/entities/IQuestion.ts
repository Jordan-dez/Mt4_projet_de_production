export interface IQuestions{
    id:number;
    challengeUuid:number;
    question:string;
    expectedAnswer:string;
    createdAt: Date;
    command?:string;
    note?:number;
    updatedAt?: Date|null;
}

export interface IQuestionsORM {
    id:number;
    challenge_uuid:number;
    question:string;
    expected_answer:string;
    created_at: Date;
    command?:string;
    note?:number;
    updated_at?: Date|null;
}

export type IQuestionsRO= Readonly<IQuestions>
export type IQuestionsORMCreate = Omit<IQuestionsORM,'updated_at'>
export type IQuestionsORMUpdate = Partial<IQuestionsORM>
export type IQuestionsORMRO = Readonly<IQuestionsORM>
export type IQuestionsORMDelete = Pick<IQuestionsORM,'id'>