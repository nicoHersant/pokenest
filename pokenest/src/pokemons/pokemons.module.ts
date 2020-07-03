import { Module, forwardRef } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from '../schemas/pokemon.schema';
import { BoxesModule } from '../boxes/boxes.module'

@Module({
    imports: [
        forwardRef(() => BoxesModule),
        MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])],
    controllers: [PokemonsController],
    providers: [PokemonsService],
    exports: [PokemonsService]
})
export class PokemonsModule {
    constructor(private pokemonsService: PokemonsService) { }
}
