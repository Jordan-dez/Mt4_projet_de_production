export interface IQuestions{
    id:number;
    challengeUuid:number;
    question:string;
    expectedAnswer:string;
    command:string;
    value:number;
    createdAt: Date;
    updatedAt?: Date|null;
}

export interface IQuestionsORM {
    id:number;
    challenge_uuid:number;
    question:string;
    expected_answer:string;
    command:string;
    value:number;
    created_at: Date;
    updated_at: Date|null;
}

export type IQuestionsRO= Readonly<IQuestions>
export type IQuestionsCreate = Omit<IQuestions,'id'|'challengeUuid'|'createdAt'|'updatedAt'>
export type IQuestionsUpdate=Partial<IQuestions>