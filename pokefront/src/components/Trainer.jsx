import React, {useEffect, useState} from "react";
import axios from 'axios';


const Trainer = (props) => {
    const [trainer, setTrainer] = useState([]);
    const [trainerUrl, setTrainerUrl] = useState('http://localhost:3030/trainers');

    useEffect(() =>{
        axios.get(trainerUrl +'/'+ props.trainerId).then((response)=>{
            setTrainer(response.data);
        }).catch((error) =>{
            console.log(error);
        })
    }, [trainerUrl, props]);

    return trainer ? (
        <div className="content-detail-trainer">
            <p><b>Id :</b> {trainer._id}</p>
            <p><b>Nom du dresseur :</b> {trainer.name}</p>
        </div>
    ) : "Voici le trainer choisi :";
};

export default Trainer;
