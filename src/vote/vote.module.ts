import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoteService } from '../vote/vote.service';
import { VoteController } from '../vote/vote.controller';
import { Vote } from '../vote/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote])
  ],
  providers: [VoteService],
  exports: [VoteService],
  controllers: [VoteController],
})
export class VoteModule { }
