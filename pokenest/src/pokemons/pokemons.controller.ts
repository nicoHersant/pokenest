import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePokemonDto, } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { MovePokemonDto } from "./dto/move-pokemon.dto";
import { PokemonsService } from './pokemons.service';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {}

    @Get()
    findAll() {
        return this.pokemonsService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pokemonsService.findOne(id);
    }

    @Post()
    create(@Body() createPokemonDto: CreatePokemonDto) {
        this.pokemonsService.create(createPokemonDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
        return this.pokemonsService.update(id, updatePokemonDto);
    }
    // @Put(':id/move')
    // movePokemon(@Param('id') id: string, @Body() movePokemonDto: MovePokemonDto) {
    //     return this.pokemonsService.addBox(id, movePokemonDto);
    // }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pokemonsService.delete(id);
    }
}
