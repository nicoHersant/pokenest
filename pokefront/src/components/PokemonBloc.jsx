import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import React, {useState} from "react";

import './css/pokemon.css'

function PokemonBloc() {
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [updateEvent, setUpdateEvent] = useState(false);

    return (

        <div className="pokemon">
            {selectedPokemon ? <div className="content-detail active">< Pokemon pokemonId={selectedPokemon} setUpdateEvent={setUpdateEvent}/></div> : <div className="content-detail"></div>}
            <div className="content-list">< PokemonList setSelectedPokemon={setSelectedPokemon} updateEvent={updateEvent}/></div>
        </div>

    )
}
export default PokemonBloc;
