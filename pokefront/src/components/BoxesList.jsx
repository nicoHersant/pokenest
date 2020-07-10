import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoxesList.css';
import BoxDetail from './Box';

const BoxesList = (props) => {
    const [boxes, setBoxes] = useState([]);
    const [url, setUrl] = useState('http://localhost:3030/boxes/')

    useEffect(() => {
        axios.get(url).then((response) => {
            setBoxes(response.data)
        }).catch((error)=> {
            console.log(error);
        })
    }, [url])

    return (
        <div className="boxesList">
            {boxes.map(box => (
                <div key={box._id}>
                    < BoxDetail box_id={box._id} trainer={box.trainer} num={box.boxNumber} type1={box.type1} type2={box.type2} pokemons={box.pokemons}/>
                </div>
            ))}
        </div>
    );
}
export default BoxesList;