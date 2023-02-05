import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound, resetRound } from "../timersettings/settingsslice";
import { selectTimer, changeTimer } from "./timerslice";

import "./timer.css";

import CountdownFocus from "./countdownfocus";
import CountdownShort from "./countdownshort";
import CountdownLong from "./countdownlong";

const Timer = () => {
    const settings = useSelector(selectSettings);
    const { status, title } = useSelector(selectTimer);
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

    //Reset button to reset timer

    return (
        <div className="timer">
            <h1>{title}</h1>
            {title === 'focus' && <CountdownFocus handleNext={handleNext}/>}
            {title === 'short' && <CountdownShort handleNext={handleNext}/>}
            {title === 'long' && <CountdownLong handleNext={handleNext}/>}
            <h1>{settings.resetRound + 1} of {sessions} sessions</h1>
            <h1>{status}</h1>
        </div>
    )
};

export default Timer;