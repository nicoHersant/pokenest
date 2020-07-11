import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePokemonDto, } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
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
        return this.pokemonsService.create(createPokemonDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
        return this.pokemonsService.update(id, updatePokemonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pokemonsService.delete(id);
    }
}
