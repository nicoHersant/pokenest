
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BoxesService } from '../src/boxes/boxes.service';
import { INestApplication } from '@nestjs/common';
import { BoxesController } from '../src/boxes/boxes.controller';

describe('Boxes', () => {
    let app: INestApplication;
    let boxesService = { findAll: () => ['test'] };
    
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

});