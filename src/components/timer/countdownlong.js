import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings, reduceRound, resetRound } from '../timersettings/settingsslice'
import { toggleStart, changeStatus, changeTimer, selectTimer } from "./timerslice";

import toFocusSound from "../../assets/toFocusSound.wav";

const CountdownLong = ({ handleNext }) => {
    const settings = useSelector(selectSettings);
    const { start, status } = useSelector(selectTimer);
    const [timerMinutes, setTimerMinutes] = useState(settings.longBreakTime);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [newDate, setNewDate] = useState(0);
    const [pausedTime, setPausedTime] = useState();
    const dispatch = useDispatch();

    const setInitialTime = () => {
        setNewDate(new Date().getTime() + (1000 * 60 * settings.longBreakTime));
    };

    let interval;
    const startTimer = () => {
        interval = setInterval(() => {
            const now = Date.now();
            const distance = newDate - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(interval);
                dispatch(resetRound());
                dispatch(changeTimer('focus'));
                playFocus();
                if (!settings.automatic) {
                    dispatch(toggleStart());
                };
            } else {
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 950);
    };

    //Set inicial Time when timer is rendered to keep the timer running
    useEffect(() => {
        setInitialTime();
    }, []);

    //Start timer and change status
    useEffect(() => {
        if (start && newDate !== 0) {
            dispatch(changeStatus('RUNNING'));
            startTimer();
            return () => {
                clearInterval(interval);
            }
        };

        if (!start && timerMinutes === settings.longBreakTime) {
            dispatch(changeStatus('ON_HOLD'));
        }

        if (!start && timerMinutes < settings.longBreakTime) {
            dispatch(changeStatus('PAUSED'));
        }
    });

    //Start / Pause button handle effect:
    const handleClick = () => {
        if (status === 'ON_HOLD') {
            setInitialTime();
        }
        if (status === 'RUNNING') {
            pause();
        }
        if (status === 'PAUSED') {
            unpause();
        }
        dispatch(toggleStart());
    };

    const pause = () => {
        setPausedTime(new Date().getTime());
    };

    const unpause = () => {
        const unpausedTime = new Date().getTime()
        const diference = unpausedTime - pausedTime;
        setNewDate(date => date + diference);
    };

    //Notifications Sounds
    const playFocus = () => {
        new Audio(toFocusSound).play();
    };

    return (
        <div>
            <p>New Long Break Timer:</p>
            <h1>{newDate}</h1>
            <p>{typeof newDate}</p>
            <h1>{timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</h1>
            <button>Reset</button>
            <button onClick={handleClick}>{start ? 'Pause' : 'Start'}</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default CountdownLong;