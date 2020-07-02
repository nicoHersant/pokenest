
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Box extends Document {

    @Prop({ required: true })
    trainer: string;
    
    @Prop()
    boxNumber: number;

    @Prop()
    type1: string;

    @Prop()
    type2: string;

    @Prop()
    pokemons: Array<{}>;
}

export const BoxSchema = SchemaFactory.createForClass(Box);
