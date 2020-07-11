import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/boxesList.css';
import './css/shine.css';
import BoxDetail from './Box';


const BoxesList = (props) => {
    const [boxes, setBoxes] = useState([])
    const [url, setUrl] = useState('http://localhost:3030/boxes/mybox/')
    const [trainers, setTrainers] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [myPokemons, setMyPokemons] = useState([])
    const [pokemonsWhitoutBox, setPokemonsWhitoutBox] = useState([])
    const [trainerName, setTrainerName] = useState('nicoh')
    const [refresh, setRefresh] = useState(true)
    const [creating, setIsCreating] = useState(false);
    const [selectedBoxNumber, setSelectedBoxNumber] = useState('')

    useEffect(() => {
        refresh && axios.get(url+trainerName).then((response) => {
            setBoxes(response.data)     // set list of boxes for the current trainer
            myPrecious()                // set list of pokemons for the current trainer
            getSelectedBoxNumber()      // set current box number for edit form
            notInAnyBox()               // set list of wild pokemons
        }).catch((error)=> {
            console.log(error)
        })
    }, [url, trainerName, props, refresh])

    useEffect(() => {
        refresh && axios.get('http://localhost:3030/trainers').then((response) => {
            setTrainers(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        refresh && axios.get('http://localhost:3030/pokemons').then((response) => {
            // fultrer les poke en boite
            setPokemons(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [refresh])

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

    const updateBox = (e) => {
        setRefresh(false)
        e.preventDefault();
        
        if (e.target.addId.value) { addPokemon(props.boxSelected, e.target.addId.value); props.setBoxSelected('') };
        if (e.target.removeId.value) { removePokemon(props.boxSelected, e.target.removeId.value); props.setBoxSelected('') };
        if (e.target.name.value) {
            let box = { "trainer": e.target.name.value };
            axios({
                method: 'put', url:"http://localhost:3030/boxes/" + props.boxSelected, data:box
            }).then((response) => {
                setRefresh(true)
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const addPokemon = (boxId, pokemonId) => {
        axios.put(`http://localhost:3030/boxes/mybox/add/${boxId}/${pokemonId}`).then(() => {
            setRefresh(true)
        }).catch((error) => {
            console.log(error);
        });
    };

    const removePokemon = (boxId, pokemonId) => {
        axios.put(`http://localhost:3030/boxes/mybox/remove/${boxId}/${pokemonId}`).then(() => {
            setRefresh(true)
        }).catch((error) => {
            console.log(error);
        });
    };

    const myPrecious = () => {
        var result = pokemons.filter((pokemon) => {
            return boxes.some((box) => {
                return props.boxSelected === pokemon.boxId;
            });
        })
        if(result){setMyPokemons(result)}
    }

    const notInAnyBox = () => {
        let result = pokemons.filter((pokemon) => {
            return (pokemon.boxId === undefined || pokemon.boxId == "");
        })
        if (result){setPokemonsWhitoutBox(result)}
    }

    const getSelectedBoxNumber = () => {
        let result = boxes.filter((box) => {
            return props.boxSelected === box._id;
        })
        if(result[0]){setSelectedBoxNumber(result[0].boxNumber)}
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

                {props.boxSelected ?
                    <form className="form-creating" onSubmit={updateBox}>
                        <p>Update {trainerName}'s' box n° : {selectedBoxNumber}</p>
                        <label htmlFor="name">Change box's trainer</label>
                        <select id="name" defaultValue="" >
                            <option value="">Choose a trainer</option>
                            {trainers.map((trainer, index) => (
                                <option key={index} value={trainer.name}>{trainer.name}</option>
                            ))}
                        </select>
                        <label htmlFor="addId">Choose a Pokemon to add</label>
                        <select id="addId" defaultValue="" >
                            <option value="">Select a pokemon</option>
                            {pokemonsWhitoutBox.map((pokemon, index) => (
                                <option key={index} value={pokemon._id}>{pokemon.name} : {pokemon.types[0]} {pokemon.types[1]}</option>
                            ))}
                        </select>
                        <label htmlFor="removeId">Choose a Pokemon to remove</label>
                        <select id="removeId" defaultValue="" >
                            <option value="">Select a pokemon</option>
                            {myPokemons.map((pokemon, index) => (
                                <option key={index} value={pokemon._id}>{pokemon.name}</option>
                            ))}
                        </select>
                        <div className="form-creating-actions">
                            <input type="submit" value="Save" className="form-creating-actions-save" />
                            <button className="form-creating-actions-cancel" onClick={() => props.setBoxSelected('')}>Close</button>
                        </div>

                    </form>
                    : <div></div>
                }

            </div>

            <div className="boxesList content-detail">
                {boxes.map(box => (
                    <div key={box._id}>< BoxDetail setRefresh={setRefresh} setBoxSelected={props.setBoxSelected} box_id={box._id} trainer={box.trainer} num={box.boxNumber} type1={box.type1} type2={box.type2} pokemons={box.pokemons} /></div>
                ))}
            </div>
        </div>
    );
}
export default BoxesList;
