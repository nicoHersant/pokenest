import React, {useContext, useState} from 'react';
import PokemonBloc from './components/PokemonBloc'

import "./components/css/basetheme.css"
import "./components/css/page.css"

function App() {


    return (
        <div className="App">

            <div className={"menu-container"}>
                <h1>Pokemon API</h1>
                <p>Pokemons</p>
                <p>Boxes</p>
                <p>Trainers</p>
            </div>

            <div className={"content-container"}>
                <PokemonBloc/>
            </div>

        </div>
    );
}

export default App;
