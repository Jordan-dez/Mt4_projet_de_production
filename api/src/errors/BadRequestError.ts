import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export class BadRequestError extends CustomError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return [{message: this.message}];
    }
    
}