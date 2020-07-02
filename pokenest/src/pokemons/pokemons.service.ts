import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonsService {

    constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>) { }

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const createdPokemon = new this.pokemonModel(createPokemonDto);
        return createdPokemon.save();
    }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonModel.find().exec();
    }
}
