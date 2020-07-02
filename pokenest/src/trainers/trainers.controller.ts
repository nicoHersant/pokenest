import {Body, Controller, Get, Post} from '@nestjs/common';
import {TrainersService} from "./trainers.service";
import {CreateTrainerDto} from "./dto/create-trainer.dto";

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
}
