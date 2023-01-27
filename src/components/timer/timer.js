import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSettings } from "../timersettings/settingsslice"
import "./timer.css";

const Timer = () => {
    const settings = useSelector(selectSettings);
    const [minutes, setMinutes] = useState(settings.workTime);
    const [seconds, setSeconds] = useState(0);
    const [start, setStart] = useState(false);

    const handleClick = () => {
        setStart(start => !start)
    };

    useEffect(() => {
        if (start) {
            const timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds => seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        setStart(start => !start);
                        //notification
                        //start the short break timer
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
    });

    return (
        <div className="timer">
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <h3>Focus</h3>
            <button>Reset</button>
            <button onClick={handleClick} type="button">{start ? 'Pause' : 'Start'}</button>
            <button>Next</button>
        </div>
    )
};

export default Timer;