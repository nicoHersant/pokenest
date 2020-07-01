import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { BoxsService } from './boxs.service';

@Controller('boxs')
export class BoxsController {
    
    @Post()
    create(@Body() createBoxDto: CreateBoxDto) {
        return 'This action adds a new Box';
    }
/*
    @Get()
    findAll(@Query() query: ListAllEntities) {
        return `This action returns all Boxs (limit: ${query.limit} items)`;
    }
*/
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} Box`;
    }
/*
    @Put(':id')
    update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
        return `This action updates a #${id} Box`;
    }
*/
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} Box`;
    }
}
