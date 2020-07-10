import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import PokemonList from './components/PokemonList';
import BoxesList from './components/BoxesList';
//import Pokemon from './components/Pokemon';
import BoxDetail from './components/Box';

function App() {
  const [boxSelected, setBoxSelected] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      < div className = "content" >
        <div className="main">
          < BoxesList setBoxSelected={setBoxSelected}/>
        </div>
        <div className="detail">
          < BoxDetail boxSelected={boxSelected}  />
        </div>
        
      </div>
      <main    ></main>
    </div>
  );
}

export default App;

//< PokemonList />
//< Pokemon />