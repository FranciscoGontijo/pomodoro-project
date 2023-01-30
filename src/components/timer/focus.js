import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound } from "../timersettings/settingsslice"
import { toggleStart, changeStatus, changeTimer, selectTimer } from "./timerslice";

import "./timer.css";
import toShortBreakSound from "../../assets/toShortBreakSound.wav";
import toLongBreakSound from "../../assets/toLongBreakSound.wav";

const FocusTimer = () => {
    const settings = useSelector(selectSettings);
    const { start } = useSelector(selectTimer);
    const [minutes, setMinutes] = useState(settings.workTime);
    const [seconds, setSeconds] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (start) {
            dispatch(changeStatus('RUNNING'));
            const timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds => seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        dispatch(toggleStart());
                        dispatch(reduceRound());
                        if (settings.rounds > 1) {
                            dispatch(changeTimer('short'))
                            playShort();
                        }
                        if (settings.rounds === 1) {
                            dispatch(changeTimer('long'))
                            playLong();
                        }
                    } else {
                        setMinutes(minutes => minutes -= 1);
                        setSeconds(seconds => seconds = 59);
                    }
                }
            }, 1000);

            return () => {
                clearInterval(timer)
            };
        }

        if (!start && minutes === settings.workTime) {
            dispatch(changeStatus('ON_HOLD'));
        }

        if (!start && minutes < settings.workTime) {
            dispatch(changeStatus('PAUSED'));
        }
    });

    const playLong = () => {
        new Audio(toLongBreakSound).play();
    };

    const playShort = () => {
        new Audio(toShortBreakSound).play();
    };

    return (
        <div className="timer">
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <h3>Focus</h3>
        </div>
    );
};

export default FocusTimer;