import {ApiProperty} from "@nestjs/swagger";

export class UpdateTrainerDto {
    @ApiProperty({
        description: 'The name of the trainer'
    })
    name: string;

    @ApiProperty({
        description: 'The number of boxes owned by the trainer'
    })
    nbBox: number;
}
