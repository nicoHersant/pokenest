import React, { useState, useEffect } from 'react';
import axios from "axios";

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState({});
    const [pokemonUrl, setPokemonUrl] = useState("http://localhost:3030/pokemons/");

    const deletePokemon = (id) => {
        axios.delete("http://localhost:3030/pokemons/"+id).then((response) => {
            console.log(response);
        }).catch( (error)=> {
            console.log(error);
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3030/pokemons/"+props.pokemonId).then((response) => {
                setPokemon(response.data);
        }).catch( (error)=> {
                console.log(error);
            });
        }, [pokemonUrl, props, deletePokemon]);


    return pokemon ? (
        <div className="content-detail-pokemon">
            <p>ID : {pokemon._id}</p>
            <p>Name : {pokemon.name}</p>
            <ul>
                {pokemon.types && pokemon.types.map(type => (
                    <li key={type}>{type}</li>
                ))}
            </ul>

            <div className="actions">
                <button className="actions-update">Update</button>
                <button onClick={() => deletePokemon(pokemon._id)} className="actions-delete">Delete</button>
            </div>

        </div>
    ) : "";
};

export default Pokemon;
