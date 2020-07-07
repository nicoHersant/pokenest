import {TrainersController} from "./trainers.controller";
import {TrainersService} from "./trainers.service";
import {Model} from "mongoose";
import {Trainer} from "../schemas/trainers.schema";


describe('TrainersController', () => {
    let trainersController: TrainersController;
    let trainersService: TrainersService;
    let trainerModel: Model<Trainer>;

    beforeEach(() => {
        trainersService = {findAll: jest.fn(), findOne: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn()} as any;
        trainersController = new TrainersController(trainersService);
    });

    describe('findAll', () => {
        it('should return an array of trainers', async () =>{
            const result =
                [
                    "test"
                ];
            (trainersService.findAll as any).mockResolvedValue(result);
            expect(await trainersController.findAll()).toBe(result);
        })
    })

    describe('findOne', () =>{
        it('should return one trainer', async () => {
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (await trainersService.findOne as any).mockResolvedValue(result);
            expect(await trainersController.findOne('5eff04c58910a64424bf4359')).toBe(result);
        });
    });

    describe('create', () =>{
        it('should return a created trainer', async () => {
            const result = [{"name": "test"}];
            (await trainersService.create as any).mockResolvedValue(result);
            expect(await trainersController.create({"name":"test", nbBox:0})).toBe(result);
        });
    });

    describe('update', () =>{
        it('should return an updated trainer', async () => {
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (await trainersService.update as any).mockResolvedValue(result);
            expect(await trainersController.update("5eff04c58910a64424bf4359",
                {"name":"nicoh", nbBox:0})).toBe(result);
        });
    });

    describe('delete', () =>{
        it('should return an updated trainer', async () => {
            const result = [{"_id":"5eff04c58910a64424bf4359"}];
            (await trainersService.delete as any).mockResolvedValue(result);
            expect(await trainersController.remove("5eff04c58910a64424bf4359")).toBe(result);
        });
    })
});
