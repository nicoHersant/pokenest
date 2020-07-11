import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/box.css';
import pokeball from '../img/pokeball-open.png';

const BoxDetail = (props) => {

    const deleteBox = (id) => {
        props.setRefresh(false)
        axios({ method: 'delete', url: `http://localhost:3030/boxes/${id}` }).then((response) => {
            props.setRefresh(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="wrapper">
            <div className="card">

                <div className="front">
                    <h1>{props.trainer}</h1>
                    <p> box n° : {props.num}</p>
                    <h3>{props.type1}, {props.type2}</h3>
                    <p className="price">free slots :  {24 - props.pokemons.length}</p>
                </div>

                <div className="right">
                    
                    <p>{props.trainer},  box n° : {props.num}</p> 
                    <div className="shining-container">
                            <button className="btn-shine" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteBox(props.box_id)}} >Remove</button>
                            <div className='shine'></div>
                    </div>
                    <div className="shining-container">
                            <button className="btn-shine" onClick={() => props.setBoxSelected(props.box_id)}>Edit</button>
                            <div className='shine'></div>
                    </div>                    
                    
                    <ul>
                        {props.pokemons && props.pokemons.map(pokemon => (
                            <li key={pokemon._id}>{pokemon.name} : {pokemon.types[0]}, {pokemon.types[1]}</li>
                            ))}
                    </ul>
                    
                </div>
            </div>

            <div className="img-wrapper">
                <img src={pokeball} alt='pokeball' />
            </div>

        </div>
    );
};
export default BoxDetail;
