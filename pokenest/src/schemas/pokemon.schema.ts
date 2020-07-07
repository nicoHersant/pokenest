import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {

    @Prop({ required: true })
    readonly name: string;

    @Prop({ required: true })
    readonly types: Array<{}>;

    @Prop()
    readonly boxId: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
