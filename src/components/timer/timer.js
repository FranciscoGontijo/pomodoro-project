import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound } from "../../slices/settingsslice";
import { selectTimer, changeTimer } from "../../slices/timerslice";

import "./timer.css";

import LabelTag from "../labeltag/labeltag";
import CountdownFocus from "./countdownfocus";
import CountdownShort from "./countdownshort";
import CountdownLong from "./countdownlong";

const Timer = () => {
    const { rounds, resetRound } = useSelector(selectSettings);
    const { title } = useSelector(selectTimer);
    const [sessions, setSessions] = useState('4');
    const dispatch = useDispatch();

    useEffect(() => { setSessions(sessions => sessions = rounds) }, []);

    const handleNext = () => {
        if (title === 'short' || title === 'long') {
            //Change to focus
            dispatch(changeTimer('focus'));
            if (title === 'long') {
                dispatch(resetRound());
            }
        }
        if (rounds > 1 && title === 'focus') {
            //Change to short break
            dispatch(changeTimer('short'));
            dispatch(reduceRound());
        }
        if (rounds === 1 && title === 'focus') {
            //Change to long break
            dispatch(changeTimer('long'));
        }
    };

    //Reset button to reset timer

    return (
        <div className="timer">
            <LabelTag />
            {title === 'focus' && <CountdownFocus handleNext={handleNext} />}
            {title === 'short' && <CountdownShort handleNext={handleNext} />}
            {title === 'long' && <CountdownLong handleNext={handleNext} />}
            <div className="sessions-container">
                <h3>{resetRound + 1} of {sessions}</h3>
                <h3>sessions</h3>
            </div>
        </div>
    )
};

export default Timer;