import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {PokemonsService} from "../src/pokemons/pokemons.service";
import { INestApplication } from '@nestjs/common';
import {PokemonsController} from "../src/pokemons/pokemons.controller";

describe('Pokemons', () => {
   let app: INestApplication;
   let pokemonsService = { findAll: () => ['test'], findOne: () => ['id'], create: () => ["test"], update: () => ["id"], updateBox: () => ["id"], delete: () => ["id"] };

   beforeAll(async () => {
       const moduleRef = await Test.createTestingModule({
           providers: [PokemonsService],
           controllers: [PokemonsController]
       })
           .overrideProvider(PokemonsService)
           .useValue(pokemonsService)
           .compile();

       app = moduleRef.createNestApplication();
       await app.init();
    });
    afterAll(async () => {
        await app.close();
    });

   it(`/GET /pokemons`, () => {
        return request(app.getHttpServer())
            .get('/pokemons')
            .expect(200)
            .expect( pokemonsService.findAll() );
   });

    it(`/GET /pokemons/id`, () => {
        return request(app.getHttpServer())
            .get('/pokemons/id')
            .expect(200)
            .expect(pokemonsService.findOne());
    });

    it(`/POST /pokemons`, () => {
        return request(app.getHttpServer())
            .post('/pokemons')
            .expect(201)
            .expect(pokemonsService.create());
    });

    it(`/PUT /pokemons/id`, () => {
        return request(app.getHttpServer())
            .put('/pokemons/id')
            .expect(200)
            .expect(pokemonsService.update());
    });

    it(`/DELETE /pokemons/id`, () => {
        return request(app.getHttpServer())
            .delete('/pokemons/id')
            .expect(200)
            .expect(pokemonsService.delete());
    });
});
