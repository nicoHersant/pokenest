import { Injectable } from '@nestjs/common';
import { Pokemon } from './interfaces/pokemon.interface';

@Injectable()
export class PokemonsService {
    private readonly pokemons: Pokemon[] = [];

    create(pokemon: Pokemon) {
        this.pokemons.push(pokemon);
    }

    findAll(): Pokemon[] {
        return this.pokemons;
    }
}
