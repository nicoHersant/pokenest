import {ApiProperty} from "@nestjs/swagger";

export class CreateTrainerDto {
    @ApiProperty({
        description: 'The name of the trainer'
    })
    name: string;

    @ApiProperty({
        description: 'The number of boxes owned by the trainer'
    })
    boxNumber: number;

    @ApiProperty({
        description: 'Array of boxes linked to the trainer'
    })
    boxes: Array<{}>;
}
