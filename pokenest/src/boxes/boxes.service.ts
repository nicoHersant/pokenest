import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box } from '../schemas/box.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxesService {

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
        let postdelete = this.boxModel.deleteOne({ _id: id }).exec();
        if ((await postdelete).deletedCount == 1) {
            return `The Box with _id : ${id} has been ultimately deleted`;
        }
    }

    async numBox(name){
        let boxes = this.boxModel.find({ trainer: name}).exec();
        return (await boxes).length;
    }

    async addPokemon(boxID: string, pokemonID: string): Promise<Box>{
        const toUpdateBox = await this.findOne(boxID);
        const toUpdatePokemon = await this.pokemonService.findOne(pokemonID);
        let notHere = await this.notInBox(toUpdateBox, toUpdatePokemon)
        if ((toUpdateBox.pokemons.length < 24) && notHere ) {
            if ( await this.setBoxType(toUpdateBox, toUpdatePokemon) == true ){
                // Add pokemon to the array of pokemons in the box entity
                toUpdateBox.pokemons.push(toUpdatePokemon) ;
                // Add the id of box in the pokemon entity
                await this.pokemonService.updateBox(pokemonID, { boxId: boxID });
                return this.boxModel.updateOne({ _id: toUpdateBox._id }, toUpdateBox);
            } else {
                console.log(`Sorry, the box is only for types ${toUpdateBox.type1} and ${toUpdateBox.type2}`);
            }
        }
        if ( !notHere ){
            console.log("Sorry, the pokemon is allready in the box or the box is full."); 
        }
    }

    async notInBox(box, poke) {
        let res = true
        box.pokemons.forEach(element => {
            if (element._id.toString() === poke._id.toString() ) {
                res = false
            }
        });
        return res
    }

    async removePokemon(boxID: string, pokemonID: string): Promise<Box> {
        const toUpdateBox = await this.findOne(boxID);
        // Remove pokemon from the array of pokemons in the box entity
        toUpdateBox.pokemons.forEach((pokemon, index) => {
            if(pokemon["_id"] == pokemonID.toString()){
                toUpdateBox.pokemons.splice(index)
            }
        });
        // Empty the field boxId in the pokemon entity
        await this.pokemonService.updateBox(pokemonID, {boxId: ""});
        return this.boxModel.updateOne({ _id: toUpdateBox._id }, toUpdateBox);
    }

    async setBoxType(box, poke) {
        if ( box.type1 === undefined ){
            box.type1 = poke.type
            this.boxModel.updateOne({ _id: box._id }, box);
            return true
        } 
        if (box.type1 != undefined && box.type1 == poke.type ) {
            return true
        }else if(box.type1 != undefined && box.type2 === undefined) {
            box.type2 = poke.type
            this.boxModel.updateOne({ _id: box._id }, box);
            return true
        }
        if ( box.type1 != undefined && box.type1 == poke.type ){ return true }
        if ( box.type2 != undefined && box.type2 == poke.type) { return true }
        if ( box.type1 !== poke.type && box.type2 !== poke.type) { return false }
    }

    isEmpty (obj) {
        return Object.keys(obj).length === 0
    }

}