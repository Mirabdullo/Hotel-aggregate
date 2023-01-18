import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'


async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const swagger = new DocumentBuilder()
  .setTitle('Hotel')
  .setDescription('Rest Api')
  .setVersion('1.0.0')
  .addTag('NodeJs, NestJs, Postgres, Sequalize')
  .build()

  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('/api/docs', app, document)


  await app.listen(PORT, () => {
    console.log(`Server is running.... http://localhost:${PORT}/api/docs`);
  });
}
start();
