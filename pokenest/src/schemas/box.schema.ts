
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pokemon } from './pokemon.schema';

@Schema()
export class Box extends Document {

    @Prop({ required: true })
    readonly trainer: string;
    
    @Prop()
    readonly boxNumber: number;

    @Prop()
    type1: string;

    @Prop()
    type2: string;

    @Prop()
    pokemons: Array<{}>;
}

export const BoxSchema = SchemaFactory.createForClass(Box);
