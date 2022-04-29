/* eslint-disable @typescript-eslint/naming-convention */
import * as Joi from 'joi'

export function getValidationSchema(): Joi.ObjectSchema {
  return Joi.object({
    API_PORT: Joi.number().port().description('The server port').default(3000),
   
  })
}
