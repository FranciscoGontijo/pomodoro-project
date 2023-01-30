import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, resetRound } from "../timersettings/settingsslice";
import { toggleStart, changeStatus, changeTimer, selectTimer } from "./timerslice";

import "./timer.css";
import toFocusSound from "../../assets/toFocusSound.wav";

const LongBreakTimer = () => {
    const settings = useSelector(selectSettings);
    const { start } = useSelector(selectTimer);
    const [minutes, setMinutes] = useState(settings.longBreakTime);
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
                        dispatch(resetRound());
                        dispatch(changeTimer('focus'));
                        playFocus();
                        dispatch(toggleStart());
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

        if (!start && minutes === settings.longBreakTime) {
            dispatch(changeStatus('ON_HOLD'));
        }

        if (!start && minutes < settings.longBreakTime) {
            dispatch(changeStatus('PAUSED'));
        }
    });

    const playFocus = () => {
        new Audio(toFocusSound).play();
    };

    return (
        <div className="timer">
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <h3>Long Break</h3>
        </div>
    );
};

export default LongBreakTimer;