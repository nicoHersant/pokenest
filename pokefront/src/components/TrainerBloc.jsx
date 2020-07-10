import TrainerList from "./TrainerList";
import Trainer from "./Trainer";
import React, {useState} from "react";

import './css/trainer.css'

function TrainerBloc() {
    const [selectedTrainer, setTrainerSelected] = useState("");

    return (

        <div className="trainer">
            {selectedTrainer ? <div className="content-detail active">< Trainer trainerId={selectedTrainer} /></div> : <div className="content-detail"></div>}
            <div className="content-list">< TrainerList setTrainerSelected = {setTrainerSelected}/></div>
        </div>

    )
}
export default TrainerBloc;
