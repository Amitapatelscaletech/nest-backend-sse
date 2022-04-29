import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from "@nestjs/common";
import { Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";

import { ShowSubscribers } from '../showsubscribe/showsubscriber.entity'
import { CreateShowSubscribeDto } from '../showsubscribe/showsubscribe.dto'
import { DatabaseFilter } from '../common/database.filter'

@Injectable()
export class ShowSubscribeService {

    private showsubscribers: ShowSubscribers[] = []
    constructor(
        @InjectRepository(ShowSubscribers)
        private showsubscribersRepository: Repository<ShowSubscribers>,
        @InjectConnection() private readonly connection: Connection       
    ){}

    /**
     * Get ChannelId From Slug
     * @param { string }slug 
     * @returns
     */
    async getChannelId(slug: string): Promise<string>{
        try {
                const resultSet = await this.connection.query(`SELECT id FROM st_shows WHERE slug = '${slug}'`);
                if(resultSet.length === 0){
                    throw new BadRequestException('This show does not exist.')
                }
                return resultSet[0].id;
        }
        catch (error) {
            console.log('ERROR: ', error);
            throw error;
        }
    }

    /**
     * Create ShowSubscribe User
     * @param createSpaceShipDto 
     * @returns
     */
    async create(createShowSubscribeDto: CreateShowSubscribeDto): Promise<CreateShowSubscribeDto> {

        try {
            const resultset = await this.findAll({
                page: 1,
                count: 10,
                whereConditions: {
                    'show_id': createShowSubscribeDto.show_id,
                    'user_id': createShowSubscribeDto.user_id
                }
            })
            
            if (resultset.length > 0) {
                throw new BadRequestException('User has already subscribed to this show');
            }
            return await this.showsubscribersRepository.save(createShowSubscribeDto);
        }
        catch (error) {
            console.log('ERROR: ', error);
            throw error;
            
        }

    }

    /**
     * Check user has already subscribed show or not
     * @param DatabaseFilter 
     * @returns
     */
   async findAll({
        page,
        count,
        whereConditions
    }: DatabaseFilter): Promise<CreateShowSubscribeDto[]> {
        return await this.showsubscribersRepository.find({
            take: count,
            skip: (page - 1) * count,
            order: {
                id: 'DESC',
            },
            where: {
                show_id: `${whereConditions.show_id}`,
                user_id: `${whereConditions.user_id}`
            }
        })
    }
}