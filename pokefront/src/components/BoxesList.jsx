import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/boxesList.css';
import './css/shine.css';
import BoxDetail from './Box';


const BoxesList = (props) => {
    const [boxes, setBoxes] = useState([])
    const [url, setUrl] = useState('http://localhost:3030/boxes/mybox/')
    const [trainers, setTrainers] = useState([])
    const [trainerName, setTrainerName] = useState('nicoh')
    const [refresh, setRefresh] = useState(true)
    const [creating, setIsCreating] = useState(false);

    useEffect(() => {
        refresh && axios.get(url+trainerName).then((response) => {
            setBoxes(response.data)
            //console.log(refresh)
        }).catch((error)=> {
            console.log(error)
        })
    }, [url, trainerName, props])

    useEffect(() => {
        axios.get('http://localhost:3030/trainers').then((response) => {
            setTrainers(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const createBox = (e) => {
        setRefresh(false)
        e.preventDefault();
        let newBox = {"trainer": e.target.name.value}
        axios({
            method: 'post', url: 'http://localhost:3030/boxes/', data: newBox
        }).then((response)=>{
            setRefresh(true)
        }).catch((error)=>{
            console.log(error)
        })
    }


    return (
        <div className="box">
            <div className="content-detail">
                {trainers.map((trainer, index) => (
                    <div key={index - 1} className="shining-container">
                        <div key={index} className="trainer-button">
                            <button key={index+1} className="btn-shine" onClick={() => setTrainerName(trainer.name)}>{trainer.name}</button>
                        </div>
                        <div key={index+2} className='shine'></div>
                    </div>
                ))}
            </div>
            <div className="content-detail content-detail-right">

                <div className="create-button">
                    {creating ?
                        <form className="form-creating" onSubmit={createBox}>
                            <p>Create a new box</p>
                            <label htmlFor="name">Name of the trainer *</label>
                            <select id="name" defaultValue="" required="required">
                                {trainers.map((trainer, index) => (
                                    <option key={index} value={trainer.name}>{trainer.name}</option>
                                ))}
                            </select>
                            <div className="form-creating-actions">
                                <input type="submit" value="Save" className="form-creating-actions-save" />
                                <button className="form-creating-actions-cancel" onClick={() => setIsCreating(false)}>Close</button>
                            </div>

                        </form>
                        : 
                        <div className="shining-container">
                            <button className="actions-create btn-shine" onClick={() => setIsCreating(true)}>Create a new box</button>
                            <div className='shine'></div>
                        </div>
                    }
                </div>

            </div>

            {props.boxSelected ? 
                <div className="content-detail">
                </div>
                :<div></div>
            }

            <div className="boxesList content-detail">
                {boxes.map(box => (
                    <div key={box._id}>< BoxDetail setBoxSelected={props.setBoxSelected} box_id={box._id} trainer={box.trainer} num={box.boxNumber} type1={box.type1} type2={box.type2} pokemons={box.pokemons} /></div>
                ))}
            </div>
        </div>
    );
}
export default BoxesList;
