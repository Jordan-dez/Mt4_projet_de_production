import { Body, Patch, Path, Request, Route } from "tsoa";
import { IUpdateUserName, IUserORMUpdate } from "../../entities/IUser";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { Crud } from "../../services/Crud";
import { AccessToken } from "../../entities/types/AccessToken";

@Route('/protected/user')
export class ProtectedUserController {
    @Patch('/{uuid}')
    public async updateUserName(
        @Path() uuid: string,
        @Body() userName: IUpdateUserName,
        @Request() req: any
    ): Promise<{ok: boolean}|any> {
        const authUserUuid = (req.res.locals as AccessToken).userUuid;

        if(uuid !== authUserUuid) {
            throw new NotAuthorizedError();
        }

        await Crud.Update<IUserORMUpdate>({
            body: {
                firstname: userName.firstname,
                lastname: userName.lastname
            },
            table: 'users',
            idKey: 'uuid',
            idValue: uuid
        })

        return {ok: true}
    }
}