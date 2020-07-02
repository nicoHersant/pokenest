import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box } from '../schemas/box.schema';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxsService {

    constructor(@InjectModel(Box.name) private boxModel: Model<Box>) { }

    async create(createBoxDto: CreateBoxDto): Promise<Box> {
        const createdBox = new this.boxModel(createBoxDto);
        return createdBox.save();
    }

    async update(updateBoxDto: UpdateBoxDto): Promise<Box> {
        const updatedBox = new this.boxModel(updateBoxDto);
        return updatedBox.updateOne(updatedBox);
    }


    async findAll(): Promise<Box[]> {
        return this.boxModel.find().exec();
    }
}