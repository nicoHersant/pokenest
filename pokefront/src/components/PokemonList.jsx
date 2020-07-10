import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const PokemonList = (props) => {
    const [pokemons, setPokemons] = useState([]);
    const [creating, setIsCreating] = useState(false);
    const [url, setUrl] = useState('http://localhost:3030/pokemons');

    useEffect(() => {
        axios.get(url).then(function (response) {
            setPokemons(response.data)
        }).catch(function (error) {
            console.log(error);
        });

    }, [url]);

    return (
        <div className="content-list-container">
            { creating ?
                <div className="form-creating">
                    <input type="text"/>
                    <input type="text"/>

                    <div className="form-creating-actions">
                        <button className="form-creating-actions-save" onClick={() => ""}>Save</button>
                        <button className="form-creating-actions-cancel" onClick={() => setIsCreating(false)}>Cancel</button>
                    </div>

                </div>
                : <button className="actions-create" onClick={() => setIsCreating(true)}>Create a new pokemon</button>
            }

            <ul className="content-list-pokemon">
                {pokemons.map(pkmn => (
                    <li key={pkmn._id} data-url={pkmn.name}
                        onClick={() => props.setSelectedPokemon(pkmn._id)}
                    >{pkmn.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
