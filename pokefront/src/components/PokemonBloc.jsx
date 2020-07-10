import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import React, {useState} from "react";

import './css/pokemon.css'

function PokemonBloc() {
    const [selectedPokemon, setSelectedPokemon] = useState("");

    return (

        <div className={"pokemon"}>
            {selectedPokemon ? <div className={"content-detail active"}>< Pokemon pokemonId={selectedPokemon} /></div> : <div className={"content-detail"}></div>}
            <div className={"content-list"}>< PokemonList setSelectedPokemon = {setSelectedPokemon}/></div>
        </div>

    )
}
export default PokemonBloc;
