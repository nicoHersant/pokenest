
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { PokemonsService } from '../pokemons/pokemons.service';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

describe('BoxesController', () => {
    let boxesController: BoxesController;
    let boxesService: BoxesService;
    let pokemonService: PokemonsService;

    beforeEach(() => {
        pokemonService = { findAll: jest.fn() } as any
        boxesService = { findAll: jest.fn(), findOne: jest.fn(), create: jest.fn(), delete: jest.fn(), update: jest.fn(), addPokemon: jest.fn(), removePokemon: jest.fn()} as any
        boxesController = new BoxesController(boxesService);
    });

    describe('findAll', () => {
        it('should return an array of boxes', async () => {
            const result = ['test'];
            (boxesService.findAll as any).mockResolvedValue(result)
            expect(await boxesController.findAll()).toBe(result);
        });
    });
    
    describe('findOne', () => {
        it('should return a boxe', async () => {
            const result = [{ "_id":"5eff37917ecb9c7a422f0801"}];
            (await boxesService.findOne as any).mockResolvedValue(result)
            expect(await boxesController.findOne('5eff37917ecb9c7a422f0801')).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return a string containing deleted box ID', async () => {
            const result = [{ "_id": "5eff37917ecb9c7a422f0801" }];
            (await boxesService.delete as any).mockResolvedValue(result)
            expect(await boxesController.remove('5eff37917ecb9c7a422f0801')).toBe(result);
        });
    });

    describe('create', () => {
        it('should return a new box', async () => {
            const result = [{ "trainer": "Full"}];
            (boxesService.create as any).mockResolvedValue(result)
            expect(await boxesController.create({
                "trainer":"Full",
                "boxNumber": getRandomInt(99), 
                "type1": "Off", 
                "type2": "Awesomeness", 
                "pokemons": [{}]
            })).toBe(result);
        });
    });

    describe('update', () => {
        it('should return an updated box', async () => {
            const result = [{ "_id": "5eff37917ecb9c7a422f0801" }];
            (boxesService.update as any).mockResolvedValue(result)
            expect(await boxesController.update('5eff37917ecb9c7a422f0801',{
                "trainer": "Full",
                "boxNumber": getRandomInt(99),
                "type1": "Off",
                "type2": "Awesomeness",
                "pokemons": [{}]
            })).toBe(result);
        });
    });

    describe('mybox/add', () => {
        it('should return an updated box', async () => {
            const result = [{ "_id": "5eff37917ecb9c7a422f0801" }];
            (boxesService.addPokemon as any).mockResolvedValue(result)
            expect(await boxesController.addPokemon('5eff37917ecb9c7a422f0801', '5efee9ac8d8949367cebcec1')).toBe(result);
        });
    });

    describe('mybox/remove', () => {
        it('should return an updated box', async () => {
            const result = [{ "_id": "5eff37917ecb9c7a422f0801" }];
            (boxesService.removePokemon as any).mockResolvedValue(result)
            expect(await boxesController.removePokemon('5eff37917ecb9c7a422f0801', '5efee9ac8d8949367cebcec1')).toBe(result);
        });
    });



});