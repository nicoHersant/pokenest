import * as request from 'supertest';
import { Test} from "@nestjs/testing";
import {TrainersService} from "../src/trainers/trainers.service";
import {INestApplication} from "@nestjs/common";
import {TrainersController} from "../src/trainers/trainers.controller";

describe ('Trainers', ()=> {
    let app: INestApplication;
    const trainersService = { findAll: () => ['test'], findOne: () => ['id'], create: () => ['test'], update: () =>['id']
    , delete: () =>['id']};

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [TrainersController],
            providers: [TrainersService],
        })
         .overrideProvider(TrainersService)
         .useValue(trainersService)
         .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    })

    it(`/GET /trainers`, () =>{
        return request(app.getHttpServer())
            .get('/trainers')
            .expect(200)
            .expect(
                trainersService.findAll()
            );
    });

    it('/GET /trainers /id', () =>{
        return request(app.getHttpServer())
            .get('/trainers/id')
            .expect(200)
            .expect(
                trainersService.findOne()
            );
    });

    it('/POST /trainers', () =>{
        return request(app.getHttpServer())
            .post('/trainers')
            .expect(201)
            .expect(
                trainersService.create()
            );
    });

    it('/PUT /trainers /id', () =>{
        return request(app.getHttpServer())
            .put('/trainers/id')
            .expect(200)
            .expect(
                trainersService.update()
            );
    });

    it('/DELETE /trainers /id', () =>{
        return request(app.getHttpServer())
            .delete('/trainers/id')
            .expect(200)
            .expect(
                trainersService.delete()
            );
    });
})
