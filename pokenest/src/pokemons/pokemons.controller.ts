import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreatePokemonDto, } from './dto/create-pokemon.dto';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './interfaces/pokemon.interface';

@Controller('pokemons')
export class PokemonsController {
    constructor(private pokemonsService: PokemonsService) {}

    @Post()
    async create(@Body() createPokemonDto: CreatePokemonDto) {
        this.pokemonsService.create(createPokemonDto);
    }

    @Get()
    async findAll(): Promise<Pokemon[]> {
        return this.pokemonsService.findAll();
    }
}
