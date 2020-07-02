import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxsService } from './boxs.service';

@Controller('boxs')
export class BoxsController {
    constructor(
        private readonly boxsService: BoxsService
    ) { }
    
    @Post()
    create(@Body() createBoxDto: CreateBoxDto) {
        return this.boxsService.create(createBoxDto);
    }

    @Get()
    findAll() {
        return this.boxsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} Box`;
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
        return this.boxsService.update(updateBoxDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} Box`;
    }
}
