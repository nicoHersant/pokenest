import { PokemonsController } from './pokemons.controller';
import {PokemonsService} from "./pokemons.service";

describe('PokemonsController', () => {
    let pokemonsController: PokemonsController;
    let pokemonsService: PokemonsService;

    beforeEach(() => {
        pokemonsService = { findAll: jest.fn(), findOne: jest.fn(), create: jest.fn(), update: jest.fn(), updateBox: jest.fn(), delete: jest.fn() } as any;
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
        it('should return a new pokemon', async () => {
            const result = [{
                        "name": "test",
                        "type": "test"
                    }];
            (pokemonsService.create as any).mockResolvedValue(result);
            expect(await pokemonsController.create({
                "name": "test",
                "type": "test"
            })).toBe(result);
        });
    });

    describe('update', () => {
        it('should return an updated pokemon', async () => {
            const result = [{ "id": "test" }];
            (pokemonsService.update as any).mockResolvedValue(result);
            expect(await pokemonsController.update('test',{
                "name": "test",
                "type": "test",
            })).toBe(result);
        });
    });

    describe('updateBox', () => {
        it('should return an updated pokemon', async () => {
            const result = [{ "id": "test" }];
            (pokemonsService.updateBox as any).mockResolvedValue(result);
            expect(await pokemonsController.updateBox('test',{
                "boxId": "test",
            })).toBe(result);
        });
    });

    describe('remove', () => {
        it('should return the deleted pokemon ID', async () => {
            const result = [{ "id": "test" }];
            (pokemonsService.delete as any).mockResolvedValue(result);
            expect(await pokemonsController.remove('test')).toBe(result);
        });
    });
});
