import { NextFunction, Request, Response, Router } from "express";
import { OkPacket, RowDataPacket } from "mysql2";
import { IUser, IUserRO, IQuestionsCreate } from "../entities/IUser";
import { DBConfig } from "../database/db.config";
import { v4 as uuidv4 } from 'uuid';
import { Roles } from "../entities/types/Roles.enum";

const routerIndex = Router({mergeParams: true});

routerIndex.post<{}, IUserRO, IQuestionsCreate>('', async (req, res, next: NextFunction) => {
    try {
        const request = req.body;

        const queryParam = {
            uuid: uuidv4(),
            email: request.email,
            firstname: request.firstname,
            lastname: request.lastname,
            roles: [Roles.STUDENT],
            created_at: new Date(),
            updated_at: null
        }

        const db = DBConfig.Connection;
        const data = await db.query<OkPacket>('insert into users set ?', queryParam);        

        res.send();
        
    } catch (err: any) {
        next(err);
    }
})

export const ROUTES_USER = routerIndex;