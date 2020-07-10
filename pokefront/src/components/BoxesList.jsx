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

    useEffect(() => {
        refresh && axios.get(url+trainerName).then((response) => {
            setBoxes(response.data)
            console.log(refresh)
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
        <div>
            <div className="content-detail">
                {trainers.map(trainer => (
                    <div className="container">
                        <div key={trainer._id} className="trainer-button"><button className="btn-shine" onClick={() => setTrainerName(trainer.name)}>{trainer.name}</button></div>
                        <div className='shine'></div>
                    </div>
                ))}
            </div>
            <div className="content-detail content-detail-right">

                <div className="create-button">
                    <form className="form-creating" onSubmit={createBox}>
                        <p>Create a new box</p>
                        <label htmlFor="name">Name of the trainer *</label>
                        <select id="name" defaultValue="">
                            {trainers.map(trainer => (
                                <option key={trainer._id} value={trainer.name}>{trainer.name}</option>
                            ))}
                        </select>
                        <div className="form-creating-actions">
                            <input type="submit" value="Save" className="form-creating-actions-save" />
                        </div>

                    </form>
                </div>

            </div>
            {props.boxSelected ? 
                <div className="content-detail">
                    <div className="update-button"><button onClick={() => console.log(props.boxSelected)}>Update a box</button></div>
                </div>
                :<div></div>
            }
            <div className="boxesList">
                {boxes.map(box => (
                    <div key={box._id}>< BoxDetail setBoxSelected={props.setBoxSelected} box_id={box._id} trainer={box.trainer} num={box.boxNumber} type1={box.type1} type2={box.type2} pokemons={box.pokemons} /></div>
                ))}
            </div>
        </div>
    );
}
export default BoxesList;