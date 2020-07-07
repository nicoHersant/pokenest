import { Model } from 'mongoose';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { BoxesService } from '../boxes/boxes.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { MovePokemonDto } from "./dto/move-pokemon.dto";

@Injectable()
export class PokemonsService {

    constructor(
        @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
        @Inject(forwardRef(() => BoxesService)) private boxesService: BoxesService
    ) { }

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

    async updateBox(id: string, movePokemonDto: MovePokemonDto): Promise<Pokemon> {
        return this.pokemonModel.updateOne({ _id: id }, movePokemonDto);
    }

    async delete(id): Promise<String> {
        let poke = await this.findOne(id);
        console.log(this.boxesService.removePokemon((await poke).boxId, id));
        let postdelete = this.pokemonModel.deleteOne({ _id: id }).exec();
        if ((await postdelete).deletedCount == 1){
            return `The pokemon with _id : ${id} has been ultimately deleted`;
        }
    }
}
