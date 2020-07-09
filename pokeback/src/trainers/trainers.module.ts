import {forwardRef, Module} from '@nestjs/common';
import { TrainersController} from "./trainers.controller";
import { TrainersService} from "./trainers.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Trainer, TrainerSchema} from "../schemas/trainers.schema";
import {BoxesModule} from "../boxes/boxes.module";

@Module({
    imports: [forwardRef(() => BoxesModule),
        MongooseModule.forFeature([{name: Trainer.name, schema: TrainerSchema}])],
    controllers: [TrainersController],
    providers: [TrainersService],
})
export class TrainersModule {}
