import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const PokemonList = (props) => {
    const [pokemons, setPokemons] = useState([]);
    const [creating, setIsCreating] = useState(false);
    const [refresh, setRefreshing] = useState(true);
    const [url, setUrl] = useState('http://localhost:3030/pokemons');

    const createPokemon = (e) => {
        e.preventDefault();

        let pokemon = {};

        if(e.target.type2.value !== "") {
            pokemon = {
                name: e.target.name.value,
                types: [e.target.type1.value, e.target.type2.value]
            };
        } else {
            pokemon = {
                name: e.target.name.value,
                types: [e.target.type1.value]
            };
        }

        axios.post("http://localhost:3030/pokemons/", pokemon).then((response) => {
            console.log(response);
            setRefreshing(true);
            setIsCreating(false);
        }).catch( (error)=> {
            console.log(error);
        });
    };

    useEffect(() => {
        refresh && axios.get(url).then(function (response) {
            setPokemons(response.data);
            setRefreshing(false);
            console.log("patate")
        }).catch(function (error) {
            console.log(error);
        });

    }, [url, refresh, props]);

    return (
        <div className="content-list-container">
            { creating ?
                <form className="form-creating" onSubmit={createPokemon}>
                    <label htmlFor="name">Name of the pokemon *</label>
                    <input type="text" id="name" required="required"/>

                    <label htmlFor="type1">First type of the pokemon *</label>
                    <select id="type1" required="required" defaultValue="">
                        <option value="" disabled>Please select an option...</option>
                        <option value="Normal">Normal</option>
                        <option value="Fire">Fire</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Water">Water</option>
                        <option value="Flying">Flying</option>
                        <option value="Grass">Grass</option>
                        <option value="Poison">Poison</option>
                        <option value="Electric">Electric</option>
                        <option value="Ground">Ground</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Rock">Rock</option>
                        <option value="Ice">Ice</option>
                        <option value="Bug">Bug</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Ghost">Ghost</option>
                        <option value="Dark">Dark</option>
                        <option value="Steel">Steel</option>
                        <option value="Fairy">Fairy</option>
                        <option value="???">???</option>
                    </select>

                    <label htmlFor="type2">Second type of the pokemon</label>
                    <select id="type2" defaultValue="">
                        <option value="" disabled>Please select an option...</option>
                        <option value="Normal">Normal</option>
                        <option value="Fire">Fire</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Water">Water</option>
                        <option value="Flying">Flying</option>
                        <option value="Grass">Grass</option>
                        <option value="Poison">Poison</option>
                        <option value="Electric">Electric</option>
                        <option value="Ground">Ground</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Rock">Rock</option>
                        <option value="Ice">Ice</option>
                        <option value="Bug">Bug</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Ghost">Ghost</option>
                        <option value="Dark">Dark</option>
                        <option value="Steel">Steel</option>
                        <option value="Fairy">Fairy</option>
                        <option value="???">???</option>
                    </select>

                    <div className="form-creating-actions">
                        <input type="submit" value="Save" className="form-creating-actions-save"/>
                        <button className="form-creating-actions-cancel" onClick={() => setIsCreating(false)}>Cancel</button>
                    </div>

                    <p>* Mandatory</p>

                </form>
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
