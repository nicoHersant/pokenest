import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PokemonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
