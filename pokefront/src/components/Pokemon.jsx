import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [next, setNext] = useState(undefined);
    const [previous, setPrevious] = useState(undefined);
    const [url, setUrl] = useState('http://localhost:3030/pokemons');

    useEffect(() => {
        axios.get(url).then(function (response) {
            setPokemons(response.data)
        }).catch(function (error) {
            console.log(error);
        });

    }, [url]);

    return (
        <div>
            <ul className="pkmnList">
                {pokemons.map(pkmn => (
                    <li key={pkmn.name}>{pkmn.name}</li>
                ))}
            </ul>
            <div style={{ display: 'inline' }}>
                <button disabled={!previous} onClick={() => setUrl(previous)}>⬅️ Previous</button>
                <button disabled={!next} onClick={() => setUrl(next)}>Next ➡️</button>
            </div>
        </div>

    );
};
export default PokemonList;
