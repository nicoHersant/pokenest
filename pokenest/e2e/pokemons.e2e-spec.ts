import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {PokemonsModule} from "../src/pokemons/pokemons.module";
import {PokemonsService} from "../src/pokemons/pokemons.service";
import { INestApplication } from '@nestjs/common';

describe('Pokemons', () => {
   let app: INestApplication;
   let pokemonsService = { findAll: () => ['test'] };

   beforeAll(async () => {
       const moduleRef = await Test.createTestingModule({
           imports: [PokemonsModule],
       })
           .overrideProvider(PokemonsService)
           .useValue(pokemonsService)
           .compile();

       app = moduleRef.createNestApplication();
       await app.init();
    });

   it(`/GET pokemons`, () => {
        return request(app.getHttpServer())
            .get('/pokemons')
            .expect(200)
            .expect({
                data: pokemonsService.findAll(),
            });
   });

   afterAll(async () => {
       await app.close();
   });
});
