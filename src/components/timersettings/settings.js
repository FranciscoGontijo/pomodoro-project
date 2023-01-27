import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeSettings, selectSettings } from "./settingsslice";

import "./settings.css";

const Settings = () => {
    const { workTime, shortBreakTime, longBreakTime, rounds } = useSelector(selectSettings);
    const [work, setWorkTime] = useState(workTime);
    const [shortBreak, setShortBreakTime] = useState(shortBreakTime);
    const [longBreak, setLongBreakTime] = useState(longBreakTime);
    const [round, setRounds] = useState(rounds);
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
                workTime: work,
                shortBreakTime: shortBreak,
                longBreakTime: longBreak,
                rounds: round
            })
          );
    };

    return (
        <div className="settings">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="work-time" className="work-time-label">Work duration: {work} min</label>
                    <div className="input-container">
                    <span>5 min</span>
                    <input type="range" className="slider" min="5" max="60" id="work-time" onChange={handleWorkChange} value={work}/>
                    <span>60 min</span>
                    </div>
                </div>
                <div>
                    <label for="short-break" className="short-break-label">Short break duration: {shortBreak} min</label>
                    <div className="input-container">
                    <span>1 min</span>
                    <input type="range" className="slider" min="1" max="30" id="short-break" onChange={handleShortChange} value={shortBreak} />
                    <span>30 min</span>
                    </div>
                </div>
                <div>
                    <label for="long-break" className="long-break-label">Long break duration: {longBreak} min</label>
                    <div className="input-container">
                    <span>1 min</span>
                    <input type="range" className="slider" min="1" max="45" id="long-break" onChange={handleLongChange} value={longBreak} />
                    <span>45 min</span>
                    </div>
                </div>
                <div>
                    <label for="rounds" className="rounds-label">Rounds: {round}</label>
                    <div className="input-container">
                    <span>2</span>
                    <input type="range" className="slider" min="2" max="15" id="rounds" onChange={handleRoundChange} value={round} />
                    <span>15</span>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};

export default Settings;