import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export class NotFoundError extends CustomError {
    statusCode: number = 404;

    constructor(id: string|number) {
        super(`Resource with id: ${id} not found.`);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return [{message: this.message}]
    }
}