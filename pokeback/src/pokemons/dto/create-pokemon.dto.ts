import {ApiProperty} from "@nestjs/swagger";

export class CreatePokemonDto {
    @ApiProperty({
        description: 'Name of the pokemon'
    })
    name: string;

    @ApiProperty({
        description: 'Type of pokemon'
    })
    types: Array<{}>;
}
