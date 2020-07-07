
import { BoxesService } from './boxes.service';
import { PokemonsService } from '../pokemons/pokemons.service';
import { Model } from 'mongoose';
import { Box } from '../schemas/box.schema';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

describe('BoxesService', () => {
    let boxesService: BoxesService;
    let boxesModel: Model<Box>;
    let pokemonService: PokemonsService;

    beforeEach(() => {
        pokemonService = { findAll: jest.fn() } as any
        boxesModel = { find: jest.fn(), findById: jest.fn(), create: jest.fn(), updateOne: jest.fn(), deleteOne: jest.fn()} as any
        boxesService = new BoxesService(boxesModel, pokemonService);
    });

    describe('findAll', () => {
        it('should return an array of boxes', async () => {
            const result = [{'test': "test"}];
            (boxesModel.find as any).mockResolvedValue(result)
            expect(await boxesService.findAll()).toBe(result)
        });
    });

    describe('findOne', () => {
        it('should return a box', async () => {
            const result = [{ "_id": "5eff37917ecb9c7a422f0801" }];
            (boxesModel.findById as any).mockResolvedValue(result)
            expect(await boxesService.findOne("5eff37917ecb9c7a422f0801")).toBe(result)
        });
    });

    describe('create', () => {
        it('should return a new box', async () => {
            const result = [{ "_id": "test" }];
            (boxesModel.create as any).mockResolvedValue(result)
            expect(await boxesService.create({
                "trainer": "mew",
                "boxNumber": getRandomInt(99),
                "type1": "Off",
                "type2": "Awesomeness",
                "pokemons": [{}]
            })).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return a string containing deleted box ID', async () => {
            const result = "5eff37917ecb9c7a422f0801";
            (await boxesModel.deleteOne({ _id: "5eff37917ecb9c7a422f0801" }) as any).mockResolvedValue(result)
            expect(await boxesService.delete('5eff37917ecb9c7a422f0801')).toBe(result);
        });
    });

    describe('update', () => {
        it('should return an updated box', async () => {
            const result = [{ "_id": "5eff37917ecb9c7a422f0801" }];
            (boxesModel.update as any).mockResolvedValue(result)
            expect(await boxesService.update('5eff37917ecb9c7a422f0801', {
                "trainer": "Full",
                "boxNumber": getRandomInt(99),
                "type1": "Off",
                "type2": "Awesomeness",
                "pokemons": [{}]
            })).toBe(result);
        });
    });

})