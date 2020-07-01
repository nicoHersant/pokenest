
import { Module, Global } from '@nestjs/common';
import { BoxsController } from './boxs.controller';
import { BoxsService } from './boxs.service';

@Module({
    controllers: [BoxsController],
    providers: [BoxsService],
})
export class BoxsModule { 
    constructor(private boxsService: BoxsService) {}
}