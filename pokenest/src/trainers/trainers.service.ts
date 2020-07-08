import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateTrainerDto} from "./dto/create-trainer.dto";
import {UpdateTrainerDto} from "./dto/update-trainer.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Trainer} from "../schemas/trainers.schema";
import {Box} from "../schemas/box.schema";
import {BoxesService} from "../boxes/boxes.service";



@Injectable()
export class TrainersService {
    constructor(
        @InjectModel(Trainer.name) private trainerModel: Model<Trainer>, private boxesService: BoxesService
    ){}

    async create( createTrainerDto: CreateTrainerDto): Promise<Trainer>{
        return this.trainerModel.create(createTrainerDto);
    }

    async findAll(): Promise<Trainer[]>{
        return this.trainerModel.find();
    }

    async findOne(id): Promise<Trainer> {
        return this.trainerModel.findOne(id);
    }

    async update(id: string, updateTrainerDto: UpdateTrainerDto): Promise<Trainer> {
        return this.trainerModel.update({ _id: id }, updateTrainerDto);
    }

    async delete(id): Promise<String>{
        const postdelete = this.trainerModel.deleteOne({_id: id});
        if ((await postdelete).deletedCount == 1){
            return `The trainer with _id : ${id} has been ultimately deleted`;
        }else{
            return `no return`;
        }
    }

    async removeBox(name:string): Promise<any> {
        const boxesToDelete = await this.boxesService.numBox(name)  
        const boxesDeleted = [];
        boxesToDelete.forEach(element => {
            boxesDeleted.push(element._id);
            console.log(element._id)
            this.boxesService.delete(element._id);
        });    
        return boxesDeleted;
    }


}
