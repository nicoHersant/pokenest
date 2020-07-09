import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  //const [next, setNext] = useState(undefined);
  //const [previous, setPrevious] = useState(undefined);
  const [url, setUrl] = useState('http://localhost:3030/pokemons')

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response)
      setPokemons(response.data)
      //setNext(next)
      //setPrevious(previous)
    }).catch(function (error) {
      console.log(error);
    })
  }, [url])

  return (
    <div>
      <ul className="pkmnList">
        {pokemons.map(pkmn => (
          <li key={pkmn.name}>{pkmn.name}</li>
        ))}
      </ul>

    </div>

  );
}
export default PokemonList;
