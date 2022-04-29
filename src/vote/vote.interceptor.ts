import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * Injects request data into the context, so that the ValidationPipe can use it.
 */
@Injectable()
export class VoteInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    request.body.channelId = request.params.channelId;
    request.body.eventId = request.params.eventId;
    return next.handle()
  }
}
