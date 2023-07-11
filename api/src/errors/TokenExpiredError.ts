import { CustomError } from "./CustomError";

export class TokenExpiredError extends CustomError {
    statusCode: number = 410;

    constructor() {
        super('Token expired');

        Object.setPrototypeOf(this, TokenExpiredError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Token expired' }];
    }
}
    