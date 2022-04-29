
import { Controller, Get, Post, Body, Delete, Param, Put, Req, Headers, UseGuards, UseInterceptors,  Sse,Res } from '@nestjs/common'
import { Request, Response } from 'express';
import {  interval, map } from 'rxjs'

import { VoteService } from './vote.service'
import { VoteShowEventValidatorPipe } from '../vote/vote.validator'
import { VoteShowEventRequestDto, CreateVoteShowEventDto } from '../vote/vote_show_event'
import { VoteInterceptor } from './vote.interceptor'
import { object, string } from 'joi';

interface LocalClientInterface{
    [key:string]:string[] | string;
}

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) { }
    public userArray : Array<string> = []
    public newClient:any = []

    @Post('/:channelId/events/:eventId')
    @UseInterceptors(VoteInterceptor)
  async  showSubscribe(
        @Req() req: Request,
        @Body(new VoteShowEventValidatorPipe()) CreateVoteShowEventDto: CreateVoteShowEventDto,
    ){
        const voteShowEventResult =  this.voteService.insert(CreateVoteShowEventDto);
        await this.getShowEventResponse(req.body.userId)
        return voteShowEventResult;
    }


     /**
     * Server sent Events, Send show wise energy Counter
     * @param req 
     * @returns 
     */
    //  @UseGuards(AuthGuard)
      @Sse('pushvote/:userId')
      async sse(
          @Req() req: Request,
          @Res() res: Response
      ){

        let localClient:LocalClientInterface = {
            id : req.params.userId,
            [req.params.userId.toString()]: []
        }
        if((this.newClient.find((keysarray:any) => keysarray.id === req.params.userId)) === undefined){
            this.newClient.push(localClient)
        }
        
        return interval(3000).pipe(map((_) => 
          ({ data: 
            `${JSON.stringify(this.newClient.find((keysarray:any) => keysarray.id === req.params.userId))}`
            })));
       
      }
  
      /**
       * Prapare response for server sent events
       * @param userId 
       * @returns 
       */
      async getShowEventResponse(userId: string) {

       const resultsetfindArray = this.newClient.find((keysarray:any) => keysarray.id === userId );
        const test: any = [];
        const resultSet = await this.voteService.fetchShowWiseVoteCounter(userId);

        resultSet.forEach(key => {
            test.push(key['energy']+'_'+key['show_id'])
            resultsetfindArray[`${userId}`] = test;
        })

        this.newClient.find((keysarray:any) => {
            if(keysarray.id === userId){
                keysarray[`${userId}`]=resultsetfindArray[`${userId}`];
                return;
            }
        
        });

      }
}
