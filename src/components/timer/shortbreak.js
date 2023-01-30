import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings } from "../timersettings/settingsslice";
import { changeStatus } from "./timerslice";

import "./timer.css";

const ShortBreakTimer = ({ start, toggleStart }) => {
    const settings = useSelector(selectSettings);
    const [minutes, setMinutes] = useState(settings.shortBreakTime);
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
                        toggleStart();
                        //notification
                        //add 1 round
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

        if (!start && minutes === settings.shortBreakTime) {
            dispatch(changeStatus('ON_HOLD'));
        }

        if (!start && minutes < settings.shortBreakTime) {
            dispatch(changeStatus('PAUSED'));
        }
    });

    return (
        <div className="timer">
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <h3>Break</h3>
        </div>
    )
};

export default ShortBreakTimer;