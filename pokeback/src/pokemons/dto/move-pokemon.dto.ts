import {ApiProperty} from "@nestjs/swagger";

export class MovePokemonDto {
    @ApiProperty({
        description: 'The id of the box where the pokemon is stored'
    })
    boxId: string
}
