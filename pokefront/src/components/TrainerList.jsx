import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TrainerList = (props) => {

    const [trainers, setTrainers] = useState([]);
    const [url, setUrl] = useState('http://localhost:3030/trainers');

    useEffect(() => {
        axios.get(url).then((response)=> {
            setTrainers(response.data)
        }).catch( (error) => {
            console.log(error);
        });

    }, [url]);

    return (
        <div>
            <ul className="content-list-trainer">
                {trainers.map(train => (
                    <li key={train._id} onClick={() => props.setTrainerSelected(train._id)}>{train.name}</li>
                ))}
            </ul>
        </div>
    );
};
export default TrainerList;
