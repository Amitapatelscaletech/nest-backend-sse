import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  //await app.listen(configService.get<string>('SERVER_PORT')!)

    const config = new DocumentBuilder()
    .setTitle('Server Sent Events')
    .setDescription('TServer Sent Events For Subscribe event ,subscribe creator')
    .setVersion('1.0')
    .addTag('sse')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 

  await app.listen(3000)
}
bootstrap()
