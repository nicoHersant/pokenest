
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BoxesService } from '../src/boxes/boxes.service';
import { INestApplication } from '@nestjs/common';
import { BoxesController } from '../src/boxes/boxes.controller';

describe('Boxes', () => {
    let app: INestApplication;
    let boxesService = { findAll: () => ['test'], findOne: () => ['test'], numBox: () => ['test'], addPokemon: () => ['test'], removePokemon: () => ['test'], create: () => ['test'], update: () => ['test'], delete: () => ['test'] };
    
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [BoxesService],
            controllers: [BoxesController]
        })
        .overrideProvider(BoxesService)
        .useValue(boxesService)
        .compile();
        
        app = moduleRef.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });

    it(`/GET /boxes`, () => {
        return request(app.getHttpServer())
            .get('/boxes')
            .expect(200)
            .expect( boxesService.findAll() );
    });

    it(`/GET /boxes/5eff37917ecb9c7a422f0801`, () => {
        return request(app.getHttpServer())
            .get('/boxes/mybox/5eff37917ecb9c7a422f0801')
            .expect(200)
            .expect(boxesService.numBox());
    });

    it(`/GET /boxes/mybox/mew`, () => {
        return request(app.getHttpServer())
            .get('/boxes/mybox/mew')
            .expect(200)
            .expect(boxesService.numBox());
    });

    it(`/POST /boxes`, () => {
        return request(app.getHttpServer())
            .post('/boxes')
            .expect(201)
            .expect(boxesService.create());
    });

    it(`/PUT /boxes/5eff37917ecb9c7a422f0801`, () => {
        return request(app.getHttpServer())
            .put('/boxes/5eff37917ecb9c7a422f0801')
            .expect(200)
            .expect(boxesService.update());
    });

    it(`/DELETE /boxes/5eff37917ecb9c7a422f0801`, () => {
        return request(app.getHttpServer())
        .delete('/boxes/5eff37917ecb9c7a422f0801')
        .expect(200)
        .expect(boxesService.delete());
    });

    it(`/PUT /boxes/mybox/add/5eff37917ecb9c7a422f0801/5efee9ac8d8949367cebcec1`, () => {
        return request(app.getHttpServer())
            .put('/boxes/mybox/add/5eff37917ecb9c7a422f0801/5efee9ac8d8949367cebcec1')
            .expect(200)
            .expect(boxesService.addPokemon());
    });
    
    it(`/PUT /boxes/mybox/remove/5eff37917ecb9c7a422f0801/5efee9ac8d8949367cebcec1`, () => {
        return request(app.getHttpServer())
            .put('/boxes/mybox/remove/5eff37917ecb9c7a422f0801/5efee9ac8d8949367cebcec1')
            .expect(200)
            .expect(boxesService.removePokemon());
    });
});