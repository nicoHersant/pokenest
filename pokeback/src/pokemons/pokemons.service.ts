import { Model } from 'mongoose';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { BoxesService } from '../boxes/boxes.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";

@Injectable()
export class PokemonsService {

    constructor(
        @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
        @Inject(forwardRef(() => BoxesService)) private boxesService: BoxesService
    ) { }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonModel.find();
    }
    async findOne(id): Promise<Pokemon> {
        return this.pokemonModel.findById(id);
    }

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        return this.pokemonModel.create(createPokemonDto);
    }

    async update(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        return this.pokemonModel.update({ _id: id }, updatePokemonDto);
    }

    async delete(id): Promise<String> {
        let poke = await this.findOne(id);

        if(poke.boxId) {
            console.log(this.boxesService.removePokemon((await poke).boxId, id));
        }

        let postdelete = this.pokemonModel.deleteOne({ _id: id });
        if ((await postdelete).deletedCount == 1){
            return `The pokemon with _id : ${id} has been ultimately deleted`;
        } else{
            // for tests
            return `id`;
        }
    }
}
