import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { ACCESS_AUD, ISSUER } from "../routes/AuthController";
import { JWT } from "../services/JWT";
import { AccessToken } from "../entities/types/AccessToken";
import { TokenExpiredError } from "../errors/TokenExpiredError";

export const JWTAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authheader = req.headers.authorization || '';
    if (!authheader.startsWith('Bearer ')) {
      throw new NotAuthorizedError();
    }

    const token = authheader.split('Bearer ')[1];

    const jwt = new JWT();
    let decoded : AccessToken|undefined;

    try {
        decoded = await jwt.decode(token, {
          issuer: ISSUER,
          audience: ACCESS_AUD,
        });
        console.log(decoded);
        
    } catch (err: any) {
      if (err?.name === "TokenExpiredError") {
        console.log("Token was expired.");
        
        throw new TokenExpiredError();
      }
      console.log(err);
    }
    
    if (!decoded) {
      throw new NotAuthorizedError('Access token could not be decoded.');
    }

    if (!decoded.userUuid) {
      throw new NotAuthorizedError("userUuid was not found in the payload");
    }

    res.locals = {
      userUuid: decoded.userUuid
    };

    next();
  } catch (err) {
    next(err)
  }
}
