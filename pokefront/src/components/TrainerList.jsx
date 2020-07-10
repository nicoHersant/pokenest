import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TrainerList = (props) => {

    const [trainers, setTrainers] = useState([]);
    const [creatingTrainer, setCreatingTrainer] = useState(false);
    const [refreshPage, setRefreshPage] = useState(true);
    const [url, setUrl] = useState('http://localhost:3030/trainers');

    const createTrainer = (e) => {
        e.preventDefault();

        let trainer = {
                name: e.target.name.value,
                imgTrainer: e.target.imgTrainer
            };

        axios.post("http://localhost:3030/trainers/", trainer).then((response) => {
            console.log(response);
            setRefreshPage(true);
            setCreatingTrainer(false);
        }).catch( (error)=> {
            console.log(error);
        });
    };

    useEffect(() => {
        refreshPage && axios.get(url).then((response)=> {
            setTrainers(response.data)
            setRefreshPage(false);
        }).catch( (error) => {
            console.log(error);
        });

    }, [url, refreshPage, props]);

    return (
        <div className="content-list-container">
            {creatingTrainer ?
                <form className="form-creating" onSubmit={createTrainer}>
                    <label htmlFor="name">Name of the trainer *</label>
                    <input type="text" id="name" required="required"/>

                    <label htmlFor="url">Picture of the trainer</label>
                    <input type="url" id="picture"/>

                    <p>* Mandatory</p>

                    <div className="form-creating-actions">
                        <input type="submit" value="Save" className="form-creating-actions-save"/>
                        <button className="form-creating-actions-cancel"
                                onClick={() => setCreatingTrainer(false)}>Cancel
                        </button>
                    </div>

                </form>
                :
                <button className="actions-create" onClick={() => setCreatingTrainer(true)}>Create a new trainer</button>
            }
            <ul className="content-list-trainer">
                {trainers.map(train => (
                    <li key={train._id} onClick={() => props.setTrainerSelected(train._id)} className="trainerName">{train.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrainerList;
