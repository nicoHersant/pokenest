
import { Module, Global } from '@nestjs/common';
import { BoxsController } from './boxs.controller';
import { BoxsService } from './boxs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from '../schemas/box.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }])],
    controllers: [BoxsController],
    providers: [BoxsService],
})
export class BoxsModule { 
    constructor(private boxsService: BoxsService) {}
}