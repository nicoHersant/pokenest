import {ApiProperty} from "@nestjs/swagger";

export class UpdatePokemonDto {
    @ApiProperty({
        description: 'Name of the pokemon'
    })
    name: string;

    @ApiProperty({
        description: 'Type of pokemon'
    })
    type: string;
}
