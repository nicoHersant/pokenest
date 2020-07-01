
export class CreateBoxDto {
    id: number;
    trainer: string;
    number: number;
    type1: string;
    type2: string;
    pokemons: Array<{}>;
}