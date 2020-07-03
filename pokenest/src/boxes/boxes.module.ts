
import { Module, Global, forwardRef } from '@nestjs/common';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from '../schemas/box.schema';
import { PokemonsModule } from '../pokemons/pokemons.module';

@Module({
    imports: [
        forwardRef(() => PokemonsModule),
        MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }])
    ],
    controllers: [BoxesController],
    providers: [BoxesService],
    exports: [BoxesService]
})
export class BoxesModule { 
    constructor(private boxesService: BoxesService) {}
}