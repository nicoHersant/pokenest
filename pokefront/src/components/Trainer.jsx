import React, {useEffect, useState} from "react";
import axios from 'axios';


const Trainer = (props) => {
    const [trainer, setTrainer] = useState([]);
    const [updatedTrainer, setUpdatedTrainer] = useState(false);
    const [refreshTrainer, setRefreshTrainer] = useState(true);
    const [trainerUrl, setTrainerUrl] = useState('http://localhost:3030/trainers');

    const updateTrainer = (e) => {
        e.preventDefault();

        let trainer = {
                name: e.target.name.value,
                imgTrainer: e.target.imgTrainer
            };

        axios.put("http://localhost:3030/trainers/"+e.target.id.value, trainer).then((response) => {
            console.log(response);
            setRefreshTrainer(true);
            setUpdatedTrainer(false);
            props.setUpdatedTrainer(true);
        }).catch( (error) => {
            console.log(error);
        });
    };

    const deleteTrainer = (id) => {
        axios.delete("http://localhost:3030/trainers/"+id).then((response) => {
            console.log(response);
            setRefreshTrainer(true);
            setUpdatedTrainer(false);
            props.setUpdatedTrainer(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() =>{
        axios.get(trainerUrl +'/'+ props.trainerId).then((response)=>{
            setTrainer(response.data);
            setRefreshTrainer(false);
            props.setUpdatedTrainer(false);
        }).catch((error) =>{
            console.log(error);
        })
    }, [trainerUrl, props, refreshTrainer]);

    return trainer ? (
        <div className="content-detail-trainer">
            <p><b>Id :</b> {trainer._id}</p>
            <p><b>Nom du dresseur :</b> {trainer.name}</p>
            <p><b>Image du dresseur : </b> <img src={trainer.imgTrainer} alt={trainer.name}/></p>


        { updatedTrainer ?
                <form className="form-updating" onSubmit={updateTrainer}>

                    <input type="hidden" id="id" defaultValue={trainer._id}/>

                    <label htmlFor="name">Name of the trainer *</label>
                    <input type="text" id="name" defaultValue={trainer.name} required="required"/>

                    <label htmlFor="url">Picture of the trainer</label>
                    <input type="url" id="picture" defaultValue={trainer.imgTrainer}/>

                    <div className="form-updating-actions">
                        <input type="submit" value="Save" className="form-updating-actions-save"/>
                        <button className="form-updating-actions-cancel" onClick={() => setUpdatedTrainer(false)}>Cancel</button>
                    </div>

                    <p>* Mandatory</p>
                </form>

                : <div className="actions">
                    <button className="actions-update" onClick={() => setUpdatedTrainer(true)}>Update</button>
                    <button onClick={() =>{if (window.confirm('Are you sure you wish to delete this trainer ?'))deleteTrainer(trainer._id)}} className="actions-delete">Delete</button>
                </div>
        }
        </div>

) : "Voici le trainer choisi :";
};

export default Trainer;
