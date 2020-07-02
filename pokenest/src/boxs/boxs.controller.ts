import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxsService } from './boxs.service';

@Controller('boxs')
export class BoxsController {
    constructor(
        private readonly boxsService: BoxsService
    ) { }
    
    @Get()
    findAll() {
        return this.boxsService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boxsService.findOne(id);
    }

    @Get('mybox/:name')
    numBox(@Param('name') name: string) {
        return this.boxsService.numBox(name);
    }

    @Get('mybox/add/:boxId/:pokemonId')
    addPokemon( @Param('boxId') boxId: string, @Param('pokemonId') pokemonId: string) {
        console.log(boxId, pokemonId )
        return this.boxsService.addPokemon(boxId, pokemonId );
    }

    @Get('mybox/remove/:boxId/:pokemonId')
    removePokemon( @Param('boxId') boxId: string, @Param('pokemonId') pokemonId: string) {
        console.log(boxId, pokemonId)
        return this.boxsService.removePokemon(boxId, pokemonId);
    }
    
    @Post()
    async create(@Body() createBoxDto: CreateBoxDto) {
        return this.boxsService.create(createBoxDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
        return this.boxsService.update(id, updateBoxDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boxsService.delete(id);
    }
}
