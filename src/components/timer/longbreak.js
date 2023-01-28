import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSettings } from "../timersettings/settingsslice"
import "./timer.css";

const LongBreakTimer = ({ start, toggleStart }) => {
    const settings = useSelector(selectSettings);
    const [minutes, setMinutes] = useState(settings.longBreakTime);
    const [seconds, setSeconds] = useState(0);

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
    });

    return (
        <div className="timer">
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <h3>Long Break</h3>
        </div>
    )
};

export default LongBreakTimer;