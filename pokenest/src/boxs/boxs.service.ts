import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box } from '../schemas/box.schema';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxsService {

    constructor(@InjectModel(Box.name) private boxModel: Model<Box>) { }

    async findAll(): Promise<Box[]> {
        return this.boxModel.find().exec();
    }
    async findOne(id): Promise<Box> {
        return this.boxModel.findById(id).exec();
    }

    async create(createBoxDto: CreateBoxDto): Promise<Box> {
        const createdBox = new this.boxModel(createBoxDto);
        return createdBox.save();
    }

    async update(id: string, updateBoxDto: UpdateBoxDto): Promise<Box> {
        return this.boxModel.updateOne({ _id: id }, updateBoxDto);
    }

    async delete(id): Promise<String> {
        // return this.boxModel.deleteOne({ _id: id }).exec();
        let postdelete = this.boxModel.deleteOne({ _id: id }).exec();
        if ((await postdelete).deletedCount == 1){
            return `The box with _id : ${id} has been ultimately deleted`;
        }
    }

    async isBoxTypeOk(){ 
        let testbox = {
            "pokemons": [],
            "_id": "5efcb7cdb807f82093416687",
            "boxNumber": 1,
            "trainer": "nicoh",
        }
        let testboxfull = {
            "pokemons": [],
            "_id": "5efcb7cdb807f82093416687",
            "boxNumber": 1,
            "trainer": "nicoh",
        }
        let testpoke = {"_id":"someid", "name":"abra", "type":"psy"}
        if (this.checkType(testbox)){
            console.log('type1 is empty')
        }
    }

    checkType(obj) {
        if (obj === undefined || obj.length ==0) return false
        if (obj.hasOwnProperty("type1") || obj.hasOwnProperty("type2")) return true
        else return 'not found'
    }

    isEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

}
