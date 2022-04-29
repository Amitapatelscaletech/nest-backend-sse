import { Module  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShowSubscribeService } from '../showsubscribe/showsubscribe.service';
import { VoteService } from '../vote/vote.service';
import { VoteModule } from '../vote/vote.module';
import { ShowSubscribeController } from '../showsubscribe/showsubscribe.controller';
import { ShowSubscribers } from '../showsubscribe/showsubscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowSubscribers]),
    VoteModule
  ],
  providers: [ShowSubscribeService],
  controllers: [ShowSubscribeController],
})
export class ShowSubscribeModule{}
