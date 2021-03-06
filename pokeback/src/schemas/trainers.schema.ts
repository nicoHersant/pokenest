import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Trainer extends Document{
    @Prop({required: true})
    readonly name: string;

    @Prop()
    boxNumber: number;

}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
