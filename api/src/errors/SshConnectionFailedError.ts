import { CustomError } from "./CustomError";
import { SerializedErrorResponse } from "../entities/types/SerializedErrorResponse.interface";

export class SshConnectionFailedError extends CustomError {
    statusCode: number = 400;

    constructor(giveServerName: string, givenIpAddress: string) {
        super(`Ssh connection failed (serverName: ${giveServerName}, ipAddress: ${givenIpAddress})`);
        Object.setPrototypeOf(this, SshConnectionFailedError.prototype);
    }

    serializeErrors(): SerializedErrorResponse[] {
        return [{message: this.message}];
    }   
}