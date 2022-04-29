import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { getValidationSchema } from './common/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ShowSubscribeModule } from './showsubscribe/showsubscribe.module';
import { ShowSubscribers } from './showsubscribe/showsubscriber.entity'
import { Vote } from './vote/vote.entity';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: getValidationSchema(),
      envFilePath: '.env',

    }),
    TypeOrmModule.forRoot({
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "Root@123",
        "database": "streamblast_admin",
        "entities": [ShowSubscribers,Vote],
        "synchronize": true
      }),
      ShowSubscribeModule,
      VoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}

