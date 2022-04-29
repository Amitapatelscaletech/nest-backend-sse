import { ParseIntPipe, HttpStatus, Sse, MessageEvent, UseInterceptors } from '@nestjs/common'
import { Controller, Get, Post, Body, Delete, Param, Put, Req, Headers, UseGuards, Res } from '@nestjs/common'
import { Observable, interval, map } from 'rxjs'
import { Request, Response } from 'express';
import { request } from 'http'

import { ShowSubscribeService } from '../showsubscribe/showsubscribe.service'
import { VoteService } from '../vote/vote.service'
import { ShowSubscribers } from '../showsubscribe/showsubscriber.entity'
import { ShowSubscribeValidatorPipe } from './showsubscribe.validator';
import { showSubscribeRequestDto, CreateShowSubscribeDto } from './showsubscribe.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { TokenPayloadInterface } from '../interfaces/server.interface';

declare global {
    namespace Express {
        interface Request {
            tokenPayload: TokenPayloadInterface
        }
    }
}

@Controller('show')
export class ShowSubscribeController {

    constructor(private readonly showsubscribeservice: ShowSubscribeService,
        private voteService: VoteService,
    ){}
    
    /**
     * Load Index.html File ,User can subscribe from here
     * @param res 
     * @returns 
     */
    @Get('/')
    get(@Res() res: Response) {
        res.sendFile('index.html'
            , { root: '.' }
        );
        return;
    }

    /**
     * Usre can subscribe show
     * @param CreateShowSubscribeDto 
     * @returns 
     
    @UseGuards(AuthGuard)
    @Get('/:slug/subscribe')
    showSubscribe(
        @Body(new ShowSubscribeValidatorPipe()) CreateShowSubscribeDto: CreateShowSubscribeDto
    ) {
        return this.showsubscribeservice.create(CreateShowSubscribeDto);
    }*/

     /**
     * Usre can subscribe show
     * @param CreateShowSubscribeDto 
     * @returns 
     */
      @UseGuards(AuthGuard)
      @Get('/:slug/subscribe/:userId')
      showSubscribe(
          @Body(new ShowSubscribeValidatorPipe()) CreateShowSubscribeDto: CreateShowSubscribeDto
      ) {
          return this.showsubscribeservice.create(CreateShowSubscribeDto);
      }

}

