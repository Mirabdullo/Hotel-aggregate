import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const swagger = new DocumentBuilder()
  .setTitle('Hotel')
  .setDescription('Rest Api')
  .setVersion('1.0.0')
  .addTag('NodeJs, NestJs, Postgres, Sequalize')
  .build()

  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('/api/docs', app, document)

  const config = app.get(ConfigService)
  const port = config.get<number>('PORT')
  await app.listen(port, () => {
    console.log(`Server is running.... ${port}`);
  });
}
start();
