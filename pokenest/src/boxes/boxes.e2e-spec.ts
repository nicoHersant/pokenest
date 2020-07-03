
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BoxesModule } from './boxes.module';
import { BoxesService } from './boxes.service';
import { INestApplication } from '@nestjs/common';

describe('Boxes', () => {
    let app: INestApplication;
    let boxesService = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BoxesModule],
        })
            .overrideProvider(BoxesService)
            .useValue(boxesService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET boxes`, () => {
        return request(app.getHttpServer())
            .get('/boxes')
            .expect(200)
            .expect({
                data: boxesService.findAll(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});