import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('Pokenest API')
      .setDescription('A small Pokenest API to play around with pokemons, trainers and boxes.')
      .setVersion('1.0')
      .addTag('Pokemons')
      .addTag('Trainers')
      .addTag('Boxes')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors()
  await app.listen(3030);
}
bootstrap();
