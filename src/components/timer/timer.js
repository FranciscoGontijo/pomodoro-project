import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound, resetRound } from "../timersettings/settingsslice";
import { toggleStart, selectTimer, changeTimer } from "./timerslice";

import "./timer.css";

import FocusTimer from "./focus";
import ShortBreakTimer from "./shortbreak";
import LongBreakTimer from "./longbreak";

const Timer = () => {
    const settings = useSelector(selectSettings);
    const { start, status, title } = useSelector(selectTimer);
    const [sessions, setSessions] = useState('4');
    const dispatch = useDispatch();

    useEffect(() => { setSessions(sessions => sessions = settings.rounds) }, []);

    const handleNext = () => {
        if (title === 'short' || title === 'long') {
            //Change to focus
            dispatch(changeTimer('focus'));
            if (title === 'long') {
                dispatch(resetRound());
            }
        }
        if (settings.rounds > 1 && title === 'focus') {
            //Change to short break
            dispatch(changeTimer('short'));
            dispatch(reduceRound());
        }
        if (settings.rounds === 1 && title === 'focus') {
            //Change to long break
            dispatch(changeTimer('long'));
        }
    };

    const toggleStarter = () => {
        dispatch(toggleStart());
    };

    //Reset button to reset timer

    return (
        <div className="timer">
            {title === 'focus' && <FocusTimer />}
            {title === 'short' && <ShortBreakTimer />}
            {title === 'long' && <LongBreakTimer />}
            <button>Reset</button>
            <button onClick={toggleStarter} type="button">{start ? 'Pause' : 'Start'}</button>
            <button onClick={handleNext}>Next</button>
            <h1>{settings.resetRound + 1} of {sessions} sessions</h1>
            <h1>{status}</h1>
        </div>
    )
};

export default Timer;