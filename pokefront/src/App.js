import React, {useContext, useState} from 'react';
import PokemonBloc from './components/PokemonBloc'
import BoxesList from './components/BoxesList';
import Pokemon from './components/Pokemon';
import BoxDetail from './components/Box';
import "./components/css/basetheme.css"
import "./components/css/page.css"

function App() {
  const [boxSelected, setBoxSelected] = useState('')

    return (
        <div className="App">

            <div className="menu-container">
                <h1>Pokemon API</h1>
                <p>Pokemons</p>
                <p>Boxes</p>
                <p>Trainers</p>
            </div>

            <div className="content-container">
                <PokemonBloc/>
                < BoxesList boxSelected={boxSelected} setBoxSelected={setBoxSelected}/>
            </div>

        </div>
    );
}

export default App;
