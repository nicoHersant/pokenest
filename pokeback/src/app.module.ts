import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesModule } from './boxes/boxes.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [
    BoxesModule, PokemonsModule, TrainersModule,
    MongooseModule.forRoot('mongodb+srv://pokenest_user:WECiw8R9Zx3u0Ebx@pokenest.zaykm.mongodb.net/pokenest?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
