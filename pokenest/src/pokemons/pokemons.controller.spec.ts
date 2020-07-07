import { PokemonsController } from './pokemons.controller';
import {PokemonsService} from "./pokemons.service";
import { Model } from 'mongoose';
import { Pokemon } from '../schemas/pokemon.schema';

describe('PokemonsController', () => {
    let pokemonsController: PokemonsController;
    let pokemonsService: PokemonsService;
    let pokemonModel: Model<Pokemon>;

    beforeEach(() => {
        pokemonsService = { findAll: jest.fn(), findOne: jest.fn(), create: jest.fn() } as any;
        pokemonsController = new PokemonsController(pokemonsService);
    });

    describe('findAll', () => {
        it('should return an array of pokemons', async () => {
            const result =
                [
                    "toto"
                ];

            (pokemonsService.findAll as any).mockResolvedValue(result);

            expect(await pokemonsController.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a pokemon', async () => {
            const result =
                [
                    "toto"
                ];

            (pokemonsService.findOne as any).mockResolvedValue(result);

            expect(await pokemonsController.findOne("id")).toBe(result);
        });
    });

    describe('create', () => {
        it('should return a pokemon', async () => {
            const result =
                [
                    {
                        "name": "test",
                        "type": "test"
                    }
                ];

            (pokemonsService.create as any).mockResolvedValue(result);

            expect(await pokemonsController.create({
                "name": "test",
                "type": "test"
            })).toBe(result);
        });
    });
});
