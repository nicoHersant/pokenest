
import { Module, Global } from '@nestjs/common';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from '../schemas/box.schema';
import { PokemonsModule } from '../pokemons/pokemons.module';

@Module({
    imports: [ PokemonsModule,
        MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }])
    ],
    controllers: [BoxesController],
    providers: [BoxesService],
})
export class BoxesModule { 
    constructor(private boxesService: BoxesService) {}
}