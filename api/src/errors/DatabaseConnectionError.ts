import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export class DatabaseConnectionError extends CustomError {
    statusCode: number;

    constructor() {
        super('Error connecting to database !!!');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return [{message: this.message}]
    }
}