import { Test } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import {PokemonsService} from "./pokemons.service";
import { Model } from 'mongoose';
import { Pokemon } from '../schemas/pokemon.schema';

describe('PokemonsController', () => {
    let pokemonsController: PokemonsController;
    let pokemonsService: PokemonsService;
    let pokemonModel: Model<Pokemon>;

    beforeEach(() => {
        pokemonsService = new PokemonsService(pokemonModel);
        pokemonsController = new PokemonsController(pokemonsService);
    });

    describe('findAll', () => {
        it('should return an array of pokemons', async () => {
            const result: Promise<Pokemon[]> = new Promise<Pokemon[]>(() =>
                [
                    {pokemonModel}
                    // {
                    //     "name": "pokemon1", "type": "type1"
                    // },
                    // {
                    //     "name": "pokemon2", "type": "type2"
                    // }
                ]
            );
            jest.spyOn(pokemonsService, 'findAll').mockImplementation(() => result);

            expect(await pokemonsController.findAll()).toBe(result);
        });
    });
});
