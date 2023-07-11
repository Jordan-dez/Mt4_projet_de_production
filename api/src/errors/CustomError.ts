import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): SerializedErrorResponse[];
}