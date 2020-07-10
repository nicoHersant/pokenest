import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoxesList.css';

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
        <div>
            <ul className="boxesList">
                {boxes.map(box => (
                    <li key={box._id}><button onClick={() => props.setBoxSelected(box._id)} >{box.trainer}, boite n° : {box.boxNumber} </button></li>
                ))}
            </ul>
        </div>
    );
}
export default BoxesList;