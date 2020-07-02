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

    @Get('boxtype')
    BoxType() {
        return this.boxsService.isBoxTypeOk();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boxsService.findOne(id);
    }
    
    @Post()
    create(@Body() createBoxDto: CreateBoxDto) {
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
