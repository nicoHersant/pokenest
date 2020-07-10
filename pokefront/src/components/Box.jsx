import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoxDetail = (props) => {
    const [box, setBox] = useState({});
    const [boxUrl, setUrl] = useState('http://localhost:3030/boxes/');

 
    useEffect(() => {
        axios.get(boxUrl + props.boxSelected).then((response) => {
            setBox(response.data)
        }).catch( (error)=> {
            console.log(error);
        });
    }, [boxUrl, props]); 

    return (
        <div className="boxDetail">
            <p>{box.trainer}, box n° : {box.boxNumber}</p>
            <p>{box.type1}, {box.type2}</p>
            <lu>
                {box.pokemons && box.pokemons.map(pokemon => (
                    <li>{pokemon.name} : {pokemon.types[0]}, {pokemon.types[1]}</li>
                ))} 
            </lu>
        </div>
    );
};
export default BoxDetail;
