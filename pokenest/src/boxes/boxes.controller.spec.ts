
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { PokemonsService } from '../pokemons/pokemons.service';
//import { Model } from 'mongoose';
//import { Box } from '../schemas/box.schema';
//import { Pokemon } from '../schemas/pokemon.schema';

describe('BoxesController', () => {
    let boxesController: BoxesController;
    let boxesService: BoxesService;
    let pokemonService: PokemonsService;
    //let boxModel: Model < Box >;
    //let pokemonModel: Model<Pokemon>;

    beforeEach(() => {
        pokemonService = { findAll: jest.fn() } as any
        boxesService = { findAll: jest.fn()} as any
        boxesController = new BoxesController(boxesService);
    });

    describe('findAll', () => {
        it('should return an array of boxes', async () => {
            const result = ['test'];
            (boxesService.findAll as any).mockResolvedValue(result)
            expect(await boxesController.findAll()).toBe(result);
        });
    });
 /*   describe('findOne', () => {
        it('should return a boxe', async () => {
            const result = ['test'];
            (boxesService.findOne as any).mockResolveValue(result)
            expect(await boxesController.findOne('5eff37917ecb9c7a422f0801')).toBe(result);
        });
    });
*/
});