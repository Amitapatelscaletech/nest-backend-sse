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
            if(request.params.slug){
                request.body.userId =request.params.userId;
                request.body.channelId = request.params.slug;
                //request.body.channelId = await this.showSubscribeService.getChannelId(request.params.slug)
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