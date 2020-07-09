import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoxDetail = () => {
    const [box, setBox] = useState([]);
    const [boxUrl, setUrl] = useState('http://localhost:3030/boxes/5efdf65382fe4731a3dc3938');

    useEffect(() => {
        axios.get(boxUrl).then((response) => {
            console.log(response);
            setBox(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }, [boxUrl]); 
    console.log(box)   
    
    return (
        <div className="boxDetail">
            <p key={box._id}>{box.trainer}, box n° : {box.boxNumber}</p>

        </div>
    );
};
export default BoxDetail;
