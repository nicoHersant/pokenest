import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
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

    @Post()
    create(@Body() createTrainerDto: CreateTrainerDto){
        this.trainersService.create(createTrainerDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
        return this.trainersService.update(id, updateTrainerDto);
    }

}
