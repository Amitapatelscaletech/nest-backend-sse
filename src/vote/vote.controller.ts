
import { Controller, Get, Post, Body, Param, Req, UseInterceptors, Res } from '@nestjs/common'
import { Request, Response } from 'express';

import { VoteService } from './vote.service'
import { VoteShowEventValidatorPipe } from '../vote/vote.validator'
import { VoteShowEventRequestDto, CreateVoteShowEventDto } from '../vote/vote_show_event'
import { VoteInterceptor } from './vote.interceptor'
import { string } from 'joi';

interface LocalClientInterface {
    [key: string]: string[] | string;
}

let clients: any = [];

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) { }
    public userArray: Array<string> = []
    public newClient: any = []

    @Post('/:channelId/events/:eventId')
    @UseInterceptors(VoteInterceptor)
    async showSubscribe(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new VoteShowEventValidatorPipe()) CreateVoteShowEventDto: CreateVoteShowEventDto,
    ) {
        const voteShowEventResult = this.voteService.insert(CreateVoteShowEventDto);
        await this.getShowEventResponse()
        res.json(this.newClient)
        return voteShowEventResult;

    }

    /**
     * Prapare response for server sent events, Send data to all clients
     * @param userId 
     * @returns 
     */
    async getShowEventResponse() {

        for (let key in clients) {
            // fetch user wise show energy counter
            const userEnergyShowResult = await this.voteService.fetchShowWiseVoteCounter(clients[key]['id']);
            let energyShowArray: any = [];
            for (let keyys of userEnergyShowResult) {
                energyShowArray.push(keyys.energy + '__' + keyys.show_id)
            }

            //Prepare updated show energy array according to client subscribe
            this.newClient.find((clientObj: any) => {
                if (clientObj.id === clients[key]['id']) {
                    clientObj[`${clientObj.id}`] = energyShowArray;
                }
            });
        }

        // Send Events to all connected client
        clients.forEach(
            (client: any) => {
                this.newClient.find((key: any) => {
                    if (key.id === client.id) {
                        client.res.write(`data: ${JSON.stringify(key[key.id])}\n\n`)
                    }
                })
            })
    }

    /**
     * How many client's are connected
     * @param req 
     * @param res 
     */
    @Get()
    status(): number {
        return clients.length;
    }

    /**
     * make sse event handler 
     * @param req 
     * @param res 
     */
    @Get('/pushvote/:userId')
    eventsHandler(
        @Req() req: Request,
        @Res() res: Response
    ) {
        res.set('Content-Type', 'text/event-stream')
        res.set('Connection', 'keep-alive')
        res.set('Cache-Control', 'no-cache')

        const localClient: any = {
            id: req.params.userId,
            [req.params.userId.toString()]: [],
        }

        // Push data only if that user is not present 
        if ((this.newClient.find((keysarray: any) => keysarray.id === req.params.userId)) === undefined) {
            this.newClient.push(localClient)
        }

        const data = `data:${JSON.stringify(this.newClient.find((keysarray: any) => keysarray.id === req.params.userId))}\n\n`;
        res.write(data)

        const clientId = req.params.userId;
        const newClient = {
            id: clientId,
            res
        };
        clients.push(newClient);
    }
}
