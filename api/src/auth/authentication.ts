import { Request } from 'express';
import { AccessToken } from '../entities/types/AccessToken';
import { JWT } from '../services/JWT';
import { ACCESS_AUD, ISSUER } from '../routes/AuthController';
import { NotAuthorizedError } from '../errors/NotAuthorizedError';
import { TokenExpiredError } from '../errors/TokenExpiredError';


export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<boolean> {

  if (securityName === 'jwt') {
    const authheader = request.headers.authorization || '';
    if (!authheader.startsWith('Bearer ')) {
      throw new NotAuthorizedError('Missing authorization header with Bearer token');
    }

    const token = authheader.split('Bearer ')[1];

    const jwt = new JWT();
    let decoded : AccessToken|undefined;
    try {
      decoded = await jwt.decode(token, {
        issuer: ISSUER,
        audience: ACCESS_AUD,
      });
      
    } catch (err: any) {
      if (err?.name === "TokenExpiredError") {
        console.log("Token was expired.");
        
        throw new TokenExpiredError();
      }
      console.log(err);
    }
    
    if (!decoded) {
      throw new NotAuthorizedError("Access token could not be decoded");
    }

    if (!decoded.userUuid) {
      throw new NotAuthorizedError("userId was not found in the payload");
    }    

    return true;
  }

  return false;
}
