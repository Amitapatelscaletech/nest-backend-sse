import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { TokenPayloadInterface } from '../interfaces/server.interface';
import { SERVER_CONFIG } from '../common/server';
import { ShowSubscribeService } from '../showsubscribe/showsubscribe.service'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private showSubscribeService: ShowSubscribeService){}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        try {
            const request = context.switchToHttp().getRequest();
           // request.headers.access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMjY4ZTMyMS1jN2FmLTRmYjktODI4Yi1mY2FjYmE2NDJmN2EiLCJnb29nbGVVc2VySWQiOiIwMjY4ZTMyMS1jN2FmLTRmYjktODI4Yi1mY2FjYmE2NDJmN2EiLCJpc05ld1VzZXIiOnRydWUsImV4cGlyZXNBdCI6MTY1MTc1NDEyOTQ1NSwiaWF0IjoxNjUxMTQ5MzMyfQ.PM3wpGAW8ygWCeqy6WFP5Pz0r_Ee1QD-5XqDh0CbpDs'
            
            const accessToken = request.headers.access_token as string
            if (!accessToken) {
                return false;
            }

            const tokenPayload = await this.verifyToken(accessToken as string);
            if (!this.isTokenPayloadValid(tokenPayload)) {
                throw new BadRequestException('Token has expired or not valid. Please login again');

            }
            request.tokenPayload = tokenPayload;
            request.body.userId = tokenPayload.userId
            if(request.params.slug){
                request.body.channelId = await this.showSubscribeService.getChannelId(request.params.slug)
            }
           return true

        } catch (error) {
            if (error instanceof JsonWebTokenError || error instanceof NotBeforeError || error instanceof TokenExpiredError) {
                return false;
            }
            throw error;
        }
    }

    /**
      * Validates Auth Token Payload
      * @param {TokenPayloadInterface | ReCaptchaTokenPayloadInterface} tokenPayload 
      * @returns {boolean}
      */
    isTokenPayloadValid(tokenPayload: TokenPayloadInterface): boolean {
       const currentTimeStamp = Date.now();
        let isTokenPayloadValid = false;
        // Validate if token payload has required details
        if (tokenPayload
            && tokenPayload.userId
            && tokenPayload.expiresAt
            && tokenPayload.expiresAt > currentTimeStamp) {
            isTokenPayloadValid = true;
        }
        return isTokenPayloadValid;
    }

    /**
     * To verify access token
     * @param {string} token token string
     * @return decoded token data
     */
    async verifyToken(token: string): Promise<any> {

        return new Promise((resolve, reject) => {
            verify(token, SERVER_CONFIG.JWT_SECRET_KEY, (err: any, decoded: any) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(decoded);
            });
        });
    }
}