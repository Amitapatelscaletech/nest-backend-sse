
import { Controller, Get, Post, Body, Delete, Param, Put, Req, Headers, UseGuards, UseInterceptors } from '@nestjs/common'

import { VoteService } from './vote.service'
import { VoteShowEventValidatorPipe } from '../vote/vote.validator'
import { VoteShowEventRequestDto, CreateVoteShowEventDto } from '../vote/vote_show_event'
import { VoteInterceptor } from './vote.interceptor'

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) { }

    @Post('/:channelId/events/:eventId')
    @UseInterceptors(VoteInterceptor)
    showSubscribe(
        @Body(new VoteShowEventValidatorPipe()) CreateVoteShowEventDto: CreateVoteShowEventDto,
    ) {
        return this.voteService.insert(CreateVoteShowEventDto);
    }
}
