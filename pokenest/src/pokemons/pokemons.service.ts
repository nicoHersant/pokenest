import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";

@Injectable()
export class PokemonsService {

    constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>) { }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonModel.find().exec();
    }
    async findOne(id): Promise<Pokemon> {
        return this.pokemonModel.findById(id).exec();
    }

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const createdPokemon = new this.pokemonModel(createPokemonDto);
        return createdPokemon.save();
    }

    async update(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        return this.pokemonModel.updateOne({ _id: id }, updatePokemonDto);
    }

    async delete(id): Promise<String> {
        let postdelete = this.pokemonModel.deleteOne({ _id: id }).exec();
        if ((await postdelete).deletedCount == 1){
            return `The pokemon with _id : ${id} has been ultimately deleted`;
        }
    }
}
