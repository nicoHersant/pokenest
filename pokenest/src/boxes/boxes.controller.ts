import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxesService } from './boxes.service';

@ApiTags('Boxes')
@Controller('boxes')
export class BoxesController {
    constructor(
        private readonly boxesService: BoxesService
    ) { }

    @Get()
    findAll() {
        return this.boxesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boxesService.findOne(id);
    }

    @Get('mybox/:name')
    numBox(@Param('name') name: string) {
        return this.boxesService.numBox(name);
    }

    @Put('mybox/add/:boxId/:pokemonId')
    addPokemon( @Param('boxId') boxId: string, @Param('pokemonId') pokemonId: string) {
        return this.boxesService.addPokemon(boxId, pokemonId );
    }

    @Put('mybox/remove/:boxId/:pokemonId')
    removePokemon( @Param('boxId') boxId: string, @Param('pokemonId') pokemonId: string) {
        console.log(boxId, pokemonId)
        return this.boxesService.removePokemon(boxId, pokemonId);
    }

    @Post()
    async create(@Body() createBoxDto: CreateBoxDto) {
        return this.boxesService.create(createBoxDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
        return this.boxesService.update(id, updateBoxDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boxesService.delete(id);
    }
}
