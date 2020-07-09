import {TrainersService} from "./trainers.service";
import { Model } from 'mongoose';
import {Trainer} from "../schemas/trainers.schema";
import { BoxesService } from "src/boxes/boxes.service";


describe('TrainersService', () =>{
    let trainersService: TrainersService;
    let trainersModel: Model<Trainer>;
    let boxesService: BoxesService;

    beforeEach(() =>{
        boxesService = { findAll: jest.fn(), numBox: jest.fn(), delete: jest.fn() } as any
        trainersModel = {create: jest.fn(), find: jest.fn(), findOne: jest.fn(), update: jest.fn(),
            deleteOne: jest.fn()} as any
        trainersService = new TrainersService(trainersModel, boxesService);
    });

    describe('findAll', () =>{
        it('should return an array of trainers', async () =>{
            const result = ["test"];
            (trainersModel.find as any).mockResolvedValue(result);
            expect(await trainersService.findAll()).toBe(result);
        });
    });

    describe('findOne', () =>{
        it('should return one trainer', async () =>{
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (trainersModel.findOne as any).mockResolvedValue(result);
            expect(await trainersService.findOne(result)).toBe(result);
        });
    });

    describe('create', () =>{
        it('should return a created trainer', async () =>{
            const result = [{"name": "test"}];
            (trainersModel.create as any).mockResolvedValue(result);
            expect(await trainersService.create({"name": "test", boxNumber:0 })).toBe(result);
        });
    });

    describe('update', () =>{
        it('should return an updated trainer', async () =>{
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (trainersModel.update as any).mockResolvedValue(result);
            expect(await trainersService.update("5eff04c58910a64424bf4359",
                {"name":"nicoh", boxNumber:0})).toBe(result);
        });
    });

    describe('delete', () =>{
        it('should return an updated trainer', async () =>{
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (trainersModel.deleteOne as any).mockResolvedValue(result);
            expect(await trainersService.delete(result));
        });
    });
    /*
    describe('removeBox', () => {
        it('should return an array of removed boxes', async () => {
            const result = ["5eff04c58910a64424bf4359" ];
            (boxesService.delete as any).mockResolvedValue(result);
            expect(await trainersService.removeBox("nicoh")).toBe(result);
        });
    });
    */
})
