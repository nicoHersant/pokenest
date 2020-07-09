import { BoxesService } from '../boxes/boxes.service';
import { PokemonsService } from './pokemons.service';
import { Model } from 'mongoose';
import { Pokemon } from '../schemas/pokemon.schema';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

describe('PokemonsServices', () => {
    let pokemonsService: PokemonsService;
    let pokemonModel: Model<Pokemon>;
    let boxesService: BoxesService;

    beforeEach(() => {
        boxesService = { findAll: jest.fn() } as any;
        pokemonModel = { find: jest.fn(), findById: jest.fn(), create: jest.fn(), update: jest.fn(), deleteOne: jest.fn()} as any;
        pokemonsService = new PokemonsService(pokemonModel, boxesService);
    });

    describe('findAll', () => {
        it('should return an array of pokemons', async () => {
            const result = [{'test': "test"}];
            (pokemonModel.find as any).mockResolvedValue(result);
            expect(await pokemonsService.findAll()).toBe(result)
        });
    });

    describe('findOne', () => {
        it('should return a pokemon', async () => {
            const result = [{ "id": "test" }];
            (pokemonModel.findById as any).mockResolvedValue(result);
            expect(await pokemonsService.findOne("test")).toBe(result)
        });
    });

    describe('create', () =>{
        it('should return a new pokemon', async () =>{
            const result =
                [
                    {
                        "name": "test",
                        "types": "test"
                    }
                ];
            (pokemonModel.create as any).mockResolvedValue(result);
            expect(await pokemonsService.create({
                "name": "test",
                "types": ["test"]
            })).toBe(result);
        });
    });

    describe('update', () => {
        it('should return an updated pokemon', async () => {
            const result = [{ "id": "test" }];
            (await pokemonModel.update as any).mockResolvedValue(result);
            expect(await pokemonsService.update('test', {
                "name": "test",
                "types": ["test"]
            })).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return the deleted pokemon ID', async () => {
            const result = "id";
            (await pokemonModel.deleteOne as any).mockResolvedValue(result);
            expect(await pokemonsService.delete('id')).toBe(result);
        });
    });
});
