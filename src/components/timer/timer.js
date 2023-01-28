import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSettings } from "../timersettings/settingsslice";

import "./timer.css";

import FocusTimer from "./focus";
import ShortBreakTimer from "./shortbreak";
import LongBreakTimer from "./longbreak";

const Timer = () => {
    const settings = useSelector(selectSettings);
    const [start, setStart] = useState(false);
    const [timer, setTimer] = useState('focus');

    const toggleStart = () => {
        setStart(start => !start)
    };

    return (
        <div className="timer">
            {timer === 'focus' && <FocusTimer
                start={start}
                toggleStart={toggleStart} />}
            {timer === 'short' && <ShortBreakTimer
                start={start}
                toggleStart={toggleStart} />}
            {timer === 'long' && <LongBreakTimer
                start={start}
                toggleStart={toggleStart} />}
            <button>Reset</button>
            <button onClick={toggleStart} type="button">{start ? 'Pause' : 'Start'}</button>
            <button>Next</button>
        </div>
    )
};

export default Timer;