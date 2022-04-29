import * as Joi from 'joi'

export const showSubscribeSchema = Joi.object({
    channelId: Joi.string().required(),
    userId: Joi.string().required(),
}).options({ abortEarly: false, allowUnknown: true });
