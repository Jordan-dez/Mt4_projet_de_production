import { Get, Path, Query, Request, Route, Security } from "tsoa";
import { IChallengeORMRO } from "../../entities/IChallenge";
import { Crud } from "../../services/Crud";
import { NotFoundError } from "../../errors/NotFoundError";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { SshService } from "../../services/Ssh";
import { SshConnectionFailedError } from "../../errors/SshConnectionFailedError";
import { Repository } from "../../database/repository/Repository";

@Route("/protected/ssh") 
@Security('jwt')
export class ProtectedSshController {
    @Get('/{challengeUuid}/test-connection')
    public async testConnection(
        @Path() challengeUuid: string,
        @Query() serverName: string,
        @Query() ipAddress: string,
        @Request() req: any
    ): Promise<any>
    {
        const authUserUuid = req.res.locals.userUuid;

        if (!authUserUuid) {
            throw new NotAuthorizedError();
        }

        const challenge = await Crud.Read<IChallengeORMRO>({
            table: 'challenges',
            idKey: 'uuid',
            idValue: challengeUuid,
            columns: ['uuid', 'name', `creator_uuid as creatorUuid`, 'description', 'status', 'total']
        });

        if(null === challenge) {
            throw new NotFoundError(challengeUuid);
        }

        const isSshConnected: boolean = await SshService.TestConnection();

        if(isSshConnected !== true) {
            throw new SshConnectionFailedError(serverName, ipAddress);
        }

        const result = await Repository.GetResultByUserAndChallenge(authUserUuid, challengeUuid);

        await Repository.UpdateResultByUserAndChallenge(authUserUuid, challengeUuid, {server_ip_address: ipAddress, server_username: serverName});

        return result;
    }
}