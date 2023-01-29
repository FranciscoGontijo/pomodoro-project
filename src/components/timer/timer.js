import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound, resetRound } from "../timersettings/settingsslice";

import "./timer.css";

import FocusTimer from "./focus";
import ShortBreakTimer from "./shortbreak";
import LongBreakTimer from "./longbreak";

const Timer = () => {
    const settings = useSelector(selectSettings);
    const [start, setStart] = useState(false);
    const [timer, setTimer] = useState('focus');
    const [sessions, setSessions] = useState('4');
    const dispatch = useDispatch();

    useEffect(() => { setSessions(sessions => sessions = settings.rounds)}, []);

    const changeTimer = () => {
        //change to back to focus
        if (timer === 'short' || timer === 'long') {
            setTimer(time => time = 'focus');
            toggleStart();
        }
        //change to short break
        if (settings.rounds > 1 && timer === 'focus') {
            setTimer(time => time = 'short');
            toggleStart();
        }
        //change to long break
        if (settings.rounds === 1 && timer === 'focus') {
            setTimer(time => time = 'long');
            toggleStart();
        }
    };

    const handleNext = () => {
        if (timer === 'short' || timer === 'long') {
            //change to focus
            setTimer(time => time = 'focus');
        }
        if (settings.rounds > 1 && timer === 'focus') {
            //change to short break
            setTimer(time => time = 'short');
            dispatch(reduceRound());
        }
        if (settings.rounds === 1 && timer === 'focus') {
            //change to long break
            setTimer(time => time = 'long');
            dispatch(resetRound());
        }
    };

    const toggleStart = () => {
        setStart(start => !start);
    };

    return (
        <div className="timer">
            {timer === 'focus' && <FocusTimer
                changeTimer={changeTimer}
                start={start}
                toggleStart={toggleStart} />}
            {timer === 'short' && <ShortBreakTimer
                changeTimer={changeTimer}
                start={start}
                toggleStart={toggleStart} />}
            {timer === 'long' && <LongBreakTimer
                changeTimer={changeTimer}
                start={start}
                toggleStart={toggleStart} />}
            <button>Reset</button>
            <button onClick={toggleStart} type="button">{start ? 'Pause' : 'Start'}</button>
            <button onClick={handleNext}>Next</button>
            <h1>{settings.resetRound + 1} sessions of {sessions}</h1>
        </div>
    )
};

export default Timer;