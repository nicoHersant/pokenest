import React, { useState, useEffect } from 'react';
import axios from "axios";

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState({});
    const [updating, setIsUpdating] = useState(false);
    const [refresh, setRefreshing] = useState(true);
    const [pokemonUrl, setPokemonUrl] = useState("http://localhost:3030/pokemons/");


    const updatePokemon = (e) => {
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

        axios.put("http://localhost:3030/pokemons/"+e.target.id.value, pokemon).then((response) => {
            console.log(response);
            setRefreshing(true);
            setIsUpdating(false);
            props.setUpdateEvent(true);
        }).catch( (error)=> {
            console.log(error);
        });
    };

    const deletePokemon = (id) => {
        axios.delete("http://localhost:3030/pokemons/"+id).then((response) => {
            console.log(response);
            setRefreshing(true);
            setIsUpdating(false);
            props.setUpdateEvent(true);
        }).catch( (error)=> {
            console.log(error);
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3030/pokemons/"+props.pokemonId).then((response) => {
            setPokemon(response.data);
            setRefreshing(false);
            props.setUpdateEvent(false);
        }).catch( (error)=> {
                console.log(error);
            });
        }, [pokemonUrl, props, refresh]);


    return pokemon ? (
        <div className="content-detail-pokemon">
            <p>ID : {pokemon._id}</p>
            <p>Name : {pokemon.name}</p>
            <ul>
                {pokemon.types && pokemon.types.map((type, key) => (
                    <li key={type}>{type}</li>
                ))}
            </ul>

            { updating ?
                <form className="form-updating" onSubmit={updatePokemon}>

                    <input type="hidden" id="id" defaultValue={pokemon._id}/>

                    <label htmlFor="name">Name of the pokemon *</label>
                    <input type="text" id="name" defaultValue={pokemon.name} required="required"/>

                    <label htmlFor="type1">First type of the pokemon *</label>
                    <select id="type1" required="required" defaultValue={pokemon.types[0]}>
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
                    <select id="type2" defaultValue={pokemon.types[1] ? pokemon.types[1] : ""}>
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

                    <div className="form-updating-actions">
                        <input type="submit" value="Save" className="form-updating-actions-save"/>
                        <button className="form-updating-actions-cancel" onClick={() => setIsUpdating(false)}>Cancel</button>
                    </div>

                    <p>* Mandatory</p>
                </form>

                : <div className="actions">
                    <button className="actions-update" onClick={() => setIsUpdating(true)}>Update</button>
                    <button onClick={() => deletePokemon(pokemon._id)} className="actions-delete">Delete</button>
                </div>
            }

        </div>
    ) : "";
};

export default Pokemon;
