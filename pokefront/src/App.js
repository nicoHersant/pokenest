import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import PokemonList from './components/PokemonList';
import BoxesList from './components/BoxesList';
//import Pokemon from './components/Pokemon';


function App() {
  const [boxSelected, setBoxSelected] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      < div >
        < BoxesList boxSelected={boxSelected} setBoxSelected={setBoxSelected}/>
      </div>
    </div>
  );
}

export default App;
