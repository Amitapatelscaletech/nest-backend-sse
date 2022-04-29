import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

import { Vote } from '../vote/vote.entity';
import { CreateVoteShowEventDto } from '../vote/vote_show_event'
import { DatabaseFilter } from '../common/database.filter'

@Injectable()
export class VoteService {

    private votes: Vote[] = []
    constructor(
        @InjectRepository(Vote)
        private voteRepository: Repository<Vote>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    /**
     * Spent Energy On Show
     * @param createVoteShowEventDto 
     * @returns 
     */
    async insert(createVoteShowEventDto: CreateVoteShowEventDto): Promise<CreateVoteShowEventDto> {
        try {
           return await this.voteRepository.save(createVoteShowEventDto);
        }
        catch (error) {
            console.log('ERROR: ', error);
            throw error;
        }
    }

    /**
     * Fetch energycounter according to SHOW
     * @param createVoteShowEventDto 
     * @returns 
     */
    async fetchShowWiseVoteCounter(userId: string): Promise<{
        'show_id': string,
        'energy': string,
    }[]> {

        try {
            const resultSet = await this.connection.query(`SELECT SUM(blast_energy) as energy,show_id FROM vote WHERE show_id IN (select show_id FROM show_subscribers WHERE user_id = '${userId}') GROUP BY show_id`);
            return resultSet;
        }
        catch (error) {
            console.log('ERROR: ', error);
            throw error;
        }
    }
}