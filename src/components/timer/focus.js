import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings, reduceRound } from "../timersettings/settingsslice"
import "./timer.css";

const FocusTimer = ({ start, toggleStart, changeTimer }) => {
    const settings = useSelector(selectSettings);
    const [minutes, setMinutes] = useState(settings.workTime);
    const [seconds, setSeconds] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (start) {
            const timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds => seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        toggleStart();
                        dispatch(reduceRound());
                        changeTimer();
                        //notification
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
    });

    return (
        <div className="timer">
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <h3>Focus</h3>
        </div>
    )
};

export default FocusTimer;