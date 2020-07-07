import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {PokemonsService} from "../src/pokemons/pokemons.service";
import { INestApplication } from '@nestjs/common';
import {PokemonsController} from "../src/pokemons/pokemons.controller";

describe('Pokemons', () => {
   let app: INestApplication;
   let pokemonsService = { findAll: () => ['test'] };

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
});
