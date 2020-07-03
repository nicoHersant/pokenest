import { ApiProperty } from '@nestjs/swagger';

export class CreateBoxDto {
    @ApiProperty({
        description: 'The trainer that owns the box',
    })
    trainer: string;

    @ApiProperty( {
        description: 'Assign a number to the box according to the number of boxes owned by the trainer',
    })
    boxNumber: number;

    @ApiProperty({
        description: 'First type of pokemon that can be found in the box',
    })
    type1: string;

    @ApiProperty({
        description: 'Second type of pokemon that can be found in the box'
    })
    type2: string;

    @ApiProperty({
        description: 'Array of pokemon that are stored in the box'
    })
    pokemons: Array<{}>;
}
