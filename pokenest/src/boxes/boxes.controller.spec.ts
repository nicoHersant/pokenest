
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
        pokemonService = { findAll: jest.fn() } as any
        boxesService = { findAll: jest.fn()} as any
        boxesController = new BoxesController(boxesService);
    });

    describe('findAll', () => {
        it('should return an array of boxes', async () => {
            const result = ['test'];
            ( boxesService.findAll as any).mockResolveValue(result)
            jest.spyOn(boxesService, 'findAll').mockImplementation(() => result);

            expect(await boxesController.findAll()).toBe(result);
        });
    });
});