import React, {useContext, useState} from 'react';
import PokemonBloc from './components/PokemonBloc'
import BoxesList from './components/BoxesList';
import "./components/css/basetheme.css"
import "./components/css/page.css"

function App() {
    const [boxSelected, setBoxSelected] = useState('');
    const [entitySelected, setEntitySelected] = useState('');

    return (
        <div className="App">

            <div className="menu-container">
                <h1>Pokemon API</h1>
                <p onClick={() => setEntitySelected("pokemon")}>Pokemons</p>
                <p onClick={() => setEntitySelected("box")}>Boxes</p>
                <p onClick={() => setEntitySelected("trainer")}>Trainers</p>
            </div>


            <div className="content-container">
                {entitySelected === "pokemon" ? <PokemonBloc/> : ""}

                {entitySelected === "box" ?
                < BoxesList boxSelected={boxSelected} setBoxSelected={setBoxSelected}/>: ""
                }

                {/* Mettre les trainers dedans */}
                {entitySelected === "trainer" ? "" : ""}

            </div>

        </div>
    );
}

export default App;
