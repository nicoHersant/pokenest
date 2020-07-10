import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/box.css';
import pokeball from '../img/pokeball-open.png';

const BoxDetail = (props) => {
    return (
        <div className="wrapper">
            <div className="card">
                <div className="front">
                    <br/>
                    <h1>{props.trainer}</h1>
                    <p> box n° : {props.num}</p>
                    <h3>{props.type1}, {props.type2}</h3>
                    <p className="price">espace libre :  {24 - props.pokemons.length}</p>
                </div>
                <div className="right">
                    <h2>{props.trainer},  box n° :{props.num}</h2>
                    <ul>
                        {props.pokemons && props.pokemons.map(pokemon => (
                            <li key={pokemon._id}>{pokemon.name} : {pokemon.types[0]}, {pokemon.types[1]}</li>
                        ))}
                    </ul>
                    <button>Move to another box</button>
                </div>
            </div>
            <div className="img-wrapper">
                {/*<img src='../../public/img/pokeball.png' alt=''/>    */}
                <img src={pokeball} alt='pokeball' />
            </div>
        </div>
    );
};
export default BoxDetail;
