import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound, resetRound } from "../timersettings/settingsslice";
import { toggleStart, selectTimer } from "./timerslice";

import "./timer.css";
import toShortBreakSound from "../../assets/toShortBreakSound.wav";
import toLongBreakSound from "../../assets/toLongBreakSound.wav";
import toFocusSound from "../../assets/toFocusSound.wav";

import FocusTimer from "./focus";
import ShortBreakTimer from "./shortbreak";
import LongBreakTimer from "./longbreak";

const Timer = () => {
    const settings = useSelector(selectSettings);
    const { start, status } = useSelector(selectTimer);
    const [timer, setTimer] = useState('focus');
    const [sessions, setSessions] = useState('4');
    const dispatch = useDispatch();

    useEffect(() => { setSessions(sessions => sessions = settings.rounds)}, []);

    const playShort = () => {
        new Audio(toShortBreakSound).play();
    }

    const playFocus = () => {
        new Audio(toFocusSound).play();
    }

    const playLong = () => {
        new Audio(toLongBreakSound).play();
    }

    const changeTimer = () => {
        //Change to back to focus
        if (timer === 'short' || timer === 'long') {
            setTimer(time => time = 'focus');
            playFocus();
            toggleStart();
        }
        //Change to short break
        if (settings.rounds > 1 && timer === 'focus') {
            setTimer(time => time = 'short');
            dispatch(reduceRound());
            playShort();
            toggleStart();
        }
        //Change to long break
        if (settings.rounds === 1 && timer === 'focus') {
            setTimer(time => time = 'long');
            dispatch(resetRound());
            playLong();
            toggleStart();
        }
    };

    const handleNext = () => {
        if (timer === 'short' || timer === 'long') {
            //Change to focus
            setTimer(time => time = 'focus');
        }
        if (settings.rounds > 1 && timer === 'focus') {
            //Change to short break
            setTimer(time => time = 'short');
            dispatch(reduceRound());
        }
        if (settings.rounds === 1 && timer === 'focus') {
            //Change to long break
            setTimer(time => time = 'long');
            dispatch(resetRound());
        }
    };

    const toggleStarter = () => {
        dispatch(toggleStart());
    };

    //Reset button to reset timer

    return (
        <div className="timer">
            {timer === 'focus' && <FocusTimer
                changeTimer={changeTimer}
                start={start}
                toggleStart={toggleStarter} />}
            {timer === 'short' && <ShortBreakTimer
                changeTimer={changeTimer}
                start={start}
                toggleStart={toggleStarter} />}
            {timer === 'long' && <LongBreakTimer
                changeTimer={changeTimer}
                start={start}
                toggleStart={toggleStarter} />}
            <button>Reset</button>
            <button onClick={toggleStarter} type="button">{start ? 'Pause' : 'Start'}</button>
            <button onClick={handleNext}>Next</button>
            <h1>{settings.resetRound + 1} of {sessions} sessions</h1>
            <h1>{status}</h1>
        </div>
    )
};

export default Timer;