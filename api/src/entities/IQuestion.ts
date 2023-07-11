export interface IQuestions{
    id:number;
    challengeUuid:string;
    question:string;
    expectedAnswer:string;
    command:string;
    value:number;
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IQuestionsORM {
    id?:number;
    challenge_uuid:string;
    question:string;
    expected_answer:string;
    command:string;
    note:number;
    created_at: Date;
    updated_at?: Date|null;
}

export type IQuestionsRO= Readonly<IQuestions>
export type IQuestionsCreate = Omit<IQuestions,'id'|'challengeUuid'|'createdAt'|'updatedAt'>
export type IQuestionsUpdate=Partial<IQuestions>