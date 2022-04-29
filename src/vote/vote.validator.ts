
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import * as Joi from 'joi'

import { VoteShowEventRequestDto, CreateVoteShowEventDto } from '../vote/vote_show_event';
import { showSubscribeSchema } from '../common/showsubscribe.validation';

/**
 * Perform Joi Validation
 */
export const voteShowEventSchema = Joi.object({
    channelId: Joi.string().required(),
    eventId: Joi.string().required(),
    blastEnergy: Joi.number().required(),
    userId: Joi.string().required(),
}).options({ abortEarly: false, allowUnknown: true });

export class VoteShowEventValidatorPipe
    implements PipeTransform<VoteShowEventRequestDto, CreateVoteShowEventDto>
{
    public transform(
        query: VoteShowEventRequestDto,
        metadata: ArgumentMetadata,
    ): CreateVoteShowEventDto {

        const result = voteShowEventSchema.validate(query, {
            convert: true,
        });

        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }

        const validSpaceShip = result.value;
        return {
            show_id: validSpaceShip.channelId,
            user_id: validSpaceShip.userId,
            blast_energy: validSpaceShip.blastEnergy,
            event_id: validSpaceShip.eventId
        } as CreateVoteShowEventDto;

    }
}
