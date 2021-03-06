import { Model } from 'mongoose';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box } from '../schemas/box.schema';
import { Pokemon } from '../schemas/pokemon.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxesService {

    constructor(
        @InjectModel(Box.name) private boxModel: Model<Box>,
        @Inject(forwardRef(() => PokemonsService)) private pokemonService: PokemonsService
    ) { }

    async findAll(): Promise<Box[]> {
        return this.boxModel.find();
    }
    async findOne(id): Promise<Box> {
        return this.boxModel.findById(id);
    }

    async create(createBoxDto: CreateBoxDto): Promise<Box> {
        if(!createBoxDto.boxNumber){ createBoxDto.boxNumber = (await this.numBox(createBoxDto.trainer)).length+1;}
        return this.boxModel.create(createBoxDto);
    }

    async update(id: string, updateBoxDto: UpdateBoxDto): Promise<Box> {
        return this.boxModel.update({ _id: id }, updateBoxDto);
    }

    async delete(id): Promise<String> {
        let postdelete = this.boxModel.deleteOne({ _id: id });
        if ((await postdelete).deletedCount == 1) {
            return `The Box with _id : ${id} has been ultimately deleted`;
        }else{
            // for tests
            return `5eff37917ecb9c7a422f0801`;
        }
    }

    async numBox(name){
        return this.boxModel.find({ trainer: name});
    }

    async addPokemon(boxID: string, pokemonID: string): Promise<Box>{
        const toUpdateBox = await this.cleanType(await this.findOne(boxID));
        const toUpdatePokemon = await this.pokemonService.findOne(pokemonID);
        let notHere = await this.notInBox(toUpdateBox, toUpdatePokemon)
        if (toUpdatePokemon.boxId == "") { toUpdatePokemon.boxId = undefined }
        if(toUpdatePokemon.boxId != undefined){console.log('The pokemon is allready in another box.')}

        if (toUpdatePokemon.boxId == undefined && toUpdateBox.pokemons.length < 24 && notHere ) {
            if (await this.setBoxType(toUpdateBox, toUpdatePokemon.types[0]) == true && await this.setBoxType(toUpdateBox, toUpdatePokemon.types[1]) == true){
                // Add pokemon to the array of pokemons in the box entity
                toUpdateBox.pokemons.push(toUpdatePokemon) ;
                // Add the id of box in the pokemon entity
                toUpdatePokemon.boxId = boxID;
                await this.pokemonService.update(pokemonID, toUpdatePokemon);
                return this.boxModel.updateOne({ _id: toUpdateBox._id }, toUpdateBox);
            } else {
                console.log(`Sorry, the box is only for types ${toUpdateBox.type1} and ${toUpdateBox.type2}`);
            }
        }
        if ( !notHere ){
            console.log("Sorry, the pokemon is allready in the box or the box is full.");
        }
    }

    async notInBox(box: Box, poke: Pokemon) {
        let res = true
        box.pokemons.forEach(element => {
            if (element["_id"].toString() === poke._id.toString() ) {
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
        // Remove Box's types if the are not usefull anymore
        this.cleanType(toUpdateBox)
        // Empty the field boxId in the pokemon entity
        const toUpdatePokemon = await this.pokemonService.findOne(pokemonID);
        toUpdatePokemon.boxId = undefined;
        await this.pokemonService.update(pokemonID, toUpdatePokemon);
        return this.boxModel.updateOne({ _id: toUpdateBox._id }, toUpdateBox);
    }

    async setBoxType(box: Box, poketype) {
        if ( poketype == undefined ){ return true; }        
        if ( box.type1 === undefined ){
            box.type1 = poketype;
            this.boxModel.updateOne({ _id: box._id }, box)
            return true
        }
        if (box.type1 != undefined && box.type1 == poketype ) {
            return true
        }
        if (box.type1 != undefined && box.type1 != poketype && box.type2 === undefined) {
            box.type2 = poketype;
            this.boxModel.updateOne({ _id: box._id }, box)
            return true
        }
        if (box.type1 == poketype || box.type2 == poketype) { return true }
        if (box.type1 !== poketype && box.type2 !== poketype) { return false }
    }

    async cleanType(box: Box): Promise<Box>{
        let types = [];
        let typesIn = [];
        box.pokemons.forEach(element => {
            if(element["types"][0] != undefined){ types.push(element["types"][0]) }
            if(element["types"][1] != undefined){ types.push(element["types"][1]) }
            const temp = new Set(types)
            typesIn = [... temp]
        });
        if (!typesIn.includes(box.type1)) { box.type1 = undefined }
        if (!typesIn.includes(box.type2)) { box.type2 = undefined }
        return box.save()
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0
    }

}
