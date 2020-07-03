import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box } from '../schemas/box.schema';
import { Pokemon } from '../schemas/pokemon.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
//  import { UpdatePokemonDto } from '../pokemons/dto/update-pokemon.dto';

@Injectable()
export class BoxsService {

    constructor(@InjectModel(Box.name) private boxModel: Model<Box>, private pokemonService: PokemonsService) { }
    
    async findAll(): Promise<Box[]> {
        return this.boxModel.find().exec();
    }
    async findOne(id): Promise<Box> {
        return this.boxModel.findById(id).exec();
    }

    async create(createBoxDto: CreateBoxDto): Promise<Box> {
        createBoxDto.boxNumber = await this.numBox(createBoxDto.trainer);
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

    async numBox(name){
        let boxes = this.boxModel.find({ trainer: name}).exec();
        return (await boxes).length;
    }

    async isBoxTypeOk(){ 
        let testbox = "1";
        let testboxfull = "2";
        let testpoke = "1";
        if (this.checkType(testbox)){
            console.log('type1 is empty')
        }
    }

    async addPokemon(boxID: string, pokemonID: string): Promise<Box>{
        const toUpdateBox = await this.findOne(boxID);
        const toUpdatePokemon = await this.pokemonService.findOne(pokemonID);
        if (await this.numBox( toUpdateBox.trainer) < 24) {
            toUpdateBox.pokemons.push(toUpdatePokemon) ;
            // TODO : update pokemon's box propertie
            return this.boxModel.updateOne({ _id: toUpdateBox._id }, toUpdateBox);
        } else {
            console.log("Sorry, the box is full, please choose anotherone.");
        }
    }

    async removePokemon(boxID: string, pokemonID: string): Promise<Box> {
        const toUpdateBox = await this.findOne(boxID);
        const toUpdatePokemon = await this.pokemonService.findOne(pokemonID);
        // TODO : update pokemon's box propertie
        toUpdateBox.pokemons.forEach((pokemon, index) => {
            if(pokemon["_id"] == pokemonID){
                toUpdateBox.pokemons.splice(index)
            }
        })
        return this.boxModel.updateOne({ _id: toUpdateBox._id }, toUpdateBox);
    }

    checkType(obj) {
        if (obj === undefined || obj.length ==0) return false
        if (obj.hasOwnProperty("type1") || obj.hasOwnProperty("type2")) return true
        else return 'Box has no type'
    }

    isEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

}