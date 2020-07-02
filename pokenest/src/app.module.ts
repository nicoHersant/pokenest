import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsModule } from './pokemons/pokemons.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [PokemonsModule, MongooseModule.forRoot('mongodb+srv://pokenest_user:WECiw8R9Zx3u0Ebx@pokenest.zaykm.mongodb.net/pokenest?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
