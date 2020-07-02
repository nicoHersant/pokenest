import { Module } from '@nestjs/common';
import { TrainersController} from "./trainers.controller";
import { TrainersService} from "./trainers.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Trainer, TrainerSchema} from "../schemas/trainers.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Trainer.name, schema: TrainerSchema}])],
    controllers: [TrainersController],
    providers: [TrainersService],
})
export class TrainersModule {}
