import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        < PokemonList />
      </header>
    </div>
  );
}

export default App;