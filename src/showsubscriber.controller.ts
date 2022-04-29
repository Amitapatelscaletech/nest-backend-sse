import { Controller, Get, Sse, MessageEvent } from '@nestjs/common'
import { Observable, interval, map } from 'rxjs'
import { AppService } from './app.service'

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get('/showping')
  getPong(): string {
    return "in show ping"
  }





  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }

 
}
