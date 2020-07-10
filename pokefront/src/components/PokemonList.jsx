import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const PokemonList = (props) => {
    const [pokemons, setPokemons] = useState([]);
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
            <ul className="content-list-pokemon">
                {pokemons.map(pkmn => (
                    <li key={pkmn._id} data-url={pkmn.name}
                        onClick={() => props.setSelectedPokemon(pkmn._id)}
                    >{pkmn.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
