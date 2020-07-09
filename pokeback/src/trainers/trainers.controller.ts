import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {TrainersService} from "./trainers.service";
import {CreateTrainerDto} from "./dto/create-trainer.dto";
import {UpdateTrainerDto} from "./dto/update-trainer.dto";

@ApiTags('Trainers')
@Controller('trainers')
export class TrainersController {

    constructor(private readonly trainersService: TrainersService) {}

    @Get()
    findAll(){
        return this.trainersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.trainersService.findOne(id);
    }

    @Post()
    async create(@Body() createTrainerDto: CreateTrainerDto){
        return this.trainersService.create(createTrainerDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
        return this.trainersService.update(id, updateTrainerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.trainersService.delete(id);
    }

}
