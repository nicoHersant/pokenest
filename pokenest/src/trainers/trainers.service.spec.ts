import {TrainersService} from "./trainers.service";
import { Model } from 'mongoose';
import {Trainer} from "../schemas/trainers.schema";
import exp from "constants";


describe('TrainersService', () =>{
    let trainersService: TrainersService;
    let trainersModel: Model<Trainer>;

    beforeEach(() =>{
        trainersModel = {create: jest.fn(), find: jest.fn(), findOne: jest.fn(), update: jest.fn(),
            deleteOne: jest.fn()} as any
        trainersService = new TrainersService(trainersModel);
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
            expect(await trainersService.create({"name": "test", nbBox:0})).toBe(result);
        });
    });

    describe('update', () =>{
        it('should return an updated trainer', async () =>{
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (trainersModel.update as any).mockResolvedValue(result);
            expect(await trainersService.update("5eff04c58910a64424bf4359",
                {"name":"nicoh", nbBox:0})).toBe(result);
        });
    });

    describe('delete', () =>{
        it('should return an updated trainer', async () =>{
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (trainersModel.deleteOne as any).mockResolvedValue(result);
            expect(await trainersService.delete(result));
        });
    });
})
