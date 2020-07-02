import { Injectable } from '@nestjs/common';
import {CreateTrainerDto} from "./dto/create-trainer.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Trainer} from "../schemas/trainers.schema";

@Injectable()
export class TrainersService {
    constructor(@InjectModel(Trainer.name) private trainerModel: Model<Trainer>){}

    async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
        const createdTrainer = new this.trainerModel(CreateTrainerDto);
        return createdTrainer;
    }

    async findAll(): Promise<Trainer[]>{
        return this.findAll();
    }
}
