import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor(message?: string) {
        super(message || 'Unauthorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return [{message: this.message}]
    }
}