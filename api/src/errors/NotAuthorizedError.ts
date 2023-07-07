import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor() {
        super('Not Authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return [{message: this.message}]
    }
}