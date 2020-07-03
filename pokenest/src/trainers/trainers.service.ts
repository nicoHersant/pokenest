import { Injectable } from '@nestjs/common';
import {CreateTrainerDto} from "./dto/create-trainer.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Trainer} from "../schemas/trainers.schema";
import {UpdateTrainerDto} from "./dto/update-trainer.dto";

@Injectable()
export class TrainersService {
    constructor(@InjectModel(Trainer.name) private trainerModel: Model<Trainer>){}

    async create( createTrainerDto: CreateTrainerDto): Promise<Trainer>{
        const createdTrainer = new this.trainerModel(createTrainerDto);
        return createdTrainer.save();
    }

    async findAll(): Promise<Trainer[]>{
        return this.trainerModel.find().exec();
    }

    async findOne(id): Promise<Trainer> {
        return this.trainerModel.findById(id).exec();
    }

    async update(id: string, updateTrainerDto: UpdateTrainerDto): Promise<Trainer> {
        return this.trainerModel.updateOne({ _id: id }, updateTrainerDto);
    }

    async delete(id): Promise<String>{
        const postdelete = this.trainerModel.deleteOne({_id: id}).exec();
        if ((await postdelete).deletedCount == 1){
            return`The trainer with _id : ${id} has been ultimately deleted`;
        }
    }
}
