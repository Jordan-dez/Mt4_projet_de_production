import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";
import { ValidationError } from 'express-validator'

export class RequestValidationError extends CustomError {
    statusCode: number = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request body content ');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return this.errors.map(error => {
            return {message: error.msg, field: error.type}
        })
    }
}