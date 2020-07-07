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
        @InjectModel(Trainer.name) private trainerModel: Model<Trainer>,
        @Inject(forwardRef(() => BoxesService)) private boxesService: BoxesService
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
            return`The trainer with _id : ${id} has been ultimately deleted`;
        }
    }

    async addBox(trainerID:string, boxID:string): Promise<Trainer>{

    }

    /*async addPokemon(boxID: string, pokemonID: string): Promise<Box>{
        const toUpdateBox = await this.findOne(boxID);
        const toUpdatePokemon = await this.pokemonService.findOne(pokemonID);
        let notHere = await this.notInBox(toUpdateBox, toUpdatePokemon)
        if ((toUpdateBox.pokemons.length < 24) && notHere ) {
            if ( await this.setBoxType(toUpdateBox, toUpdatePokemon) == true ){
                // Add pokemon to the array of pokemons in the box entity
                toUpdateBox.pokemons.push(toUpdatePokemon) ;
                // Add the id of box in the pokemon entity
                await this.pokemonService.updateBox(pokemonID, { boxId: boxID });
                return this.boxModel.update({ _id: toUpdateBox._id }, toUpdateBox);
            } else {
                console.log(`Sorry, the box is only for types ${toUpdateBox.type1} and ${toUpdateBox.type2}`);
            }
        }
        if ( !notHere ){
            console.log("Sorry, the pokemon is allready in the box or the box is full.");
        }
    }*/

    /*async removePokemon(boxID: string, pokemonID: string): Promise<Box> {
        const toUpdateBox = await this.findOne(boxID);
        // Remove pokemon from the array of pokemons in the box entity
        toUpdateBox.pokemons.forEach((pokemon, index) => {
            if(pokemon["_id"] == pokemonID.toString()){
                toUpdateBox.pokemons.splice(index)
            }
        });*/
}
