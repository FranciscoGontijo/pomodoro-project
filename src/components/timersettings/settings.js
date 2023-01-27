import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { changeSettings } from "./settingsSlice"

import "./settings.css";

const Settings = () => {
    const [workTime, setWorkTime] = useState(25);
    const [shortBreakTime, setShortBreakTime] = useState(5);
    const [longBreakTime, setLongBreakTime] = useState(25);
    const [rounds, setRounds] = useState(4);
    const dispatch = useDispatch();

    const handleWorkChange = (e) => {
        setWorkTime(time => time = e.target.value);
    };

    const handleShortChange = (e) => {
        setShortBreakTime(time => time = e.target.value);
    };

    const handleLongChange = (e) => {
        setLongBreakTime(time => time = e.target.value);
    };

    const handleRoundChange = (e) => {
        setRounds(round => round = e.target.value);
    };

    const handleSubmit = (e) => {
        //uptade main state
        e.preventDefault();
        dispatch(
            changeSettings({
                workTime: workTime,
                shortBreakTime: shortBreakTime,
                longBreakTime: longBreakTime,
                rounds: rounds
            })
          );
    };

    return (
        <div className="settings">
            <h1>Settings</h1>
            <form>
                <div>
                    <label for="work-time" className="work-time-label">Work duration: {workTime} min</label>
                    <div className="input-container">
                    <span>5 min</span>
                    <input type="range" className="slider" min="5" max="60" id="work-time" onChange={handleWorkChange} value={workTime}/>
                    <span>60 min</span>
                    </div>
                </div>
                <div>
                    <label for="short-break" className="short-break-label">Short break duration: {shortBreakTime} min</label>
                    <div className="input-container">
                    <span>1 min</span>
                    <input type="range" className="slider" min="1" max="30" id="short-break" onChange={handleShortChange} value={shortBreakTime} />
                    <span>30 min</span>
                    </div>
                </div>
                <div>
                    <label for="long-break" className="long-break-label">Long break duration: {longBreakTime} min</label>
                    <div className="input-container">
                    <span>1 min</span>
                    <input type="range" className="slider" min="1" max="45" id="long-break" onChange={handleLongChange} value={longBreakTime} />
                    <span>45 min</span>
                    </div>
                </div>
                <div>
                    <label for="rounds" className="rounds-label">Rounds: {rounds}</label>
                    <div className="input-container">
                    <span>2</span>
                    <input type="range" className="slider" min="2" max="15" id="rounds" onChange={handleRoundChange} value={rounds} />
                    <span>15</span>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};

export default Settings;