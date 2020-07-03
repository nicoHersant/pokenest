
import { Test } from '@nestjs/testing';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { PokemonsService } from '../pokemons/pokemons.service';
import { Model } from 'mongoose';
import { Box } from '../schemas/box.schema';
import { Pokemon } from '../schemas/pokemon.schema';

describe('BoxesController', () => {
    let boxesController: BoxesController;
    let boxesService: BoxesService;
    let boxModel: Model < Box >;
    let pokemonModel: Model<Pokemon>;
    let pokemonService: PokemonsService;

    beforeEach(() => {
        pokemonService = new PokemonsService(pokemonModel);
        boxesService = new BoxesService(boxModel, pokemonService);
        boxesController = new BoxesController(boxesService);
    });

    describe('findAll', () => {
        it('should return an array of boxes', async () => {
            const result = ['test'];
            jest.spyOn(boxesService, 'findAll').mockImplementation(() => result);

            expect(await boxesController.findAll()).toBe(result);
        });
    });
});