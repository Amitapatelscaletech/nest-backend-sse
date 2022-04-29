
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import * as Joi from 'joi'

import { showSubscribeRequestDto, CreateShowSubscribeDto } from './showsubscribe.dto';
import { showSubscribeSchema } from '../common/showsubscribe.validation';

/**
 * Create Class for custom valdiator, also perform transformation on request params
 */
export class ShowSubscribeValidatorPipe
    implements PipeTransform<showSubscribeRequestDto, CreateShowSubscribeDto>
{
    public transform(
        query: showSubscribeRequestDto,
        metadata: ArgumentMetadata,
    ): CreateShowSubscribeDto {
        const result = showSubscribeSchema.validate(query, {
            convert: true,
        });

        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }

        const validSpaceShip = result.value;
        return {
            show_id: validSpaceShip.channelId,
            user_id: validSpaceShip.userId
        } as CreateShowSubscribeDto;
    }
}
