import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import axios from 'axios';

import { selectSettings, reduceRound } from '../../slices/settingsslice'
import { toggleStart, changeStatus, changeTimer, selectTimer } from "../../slices/timerslice";
import { selectCurrentLabel } from '../../slices/labeltagslice';
import { selectUser } from '../../slices/userSlice';

import './timer.css'

import toShortBreakSound from "../../assets/notification/toShortBreakSound.wav";
import toLongBreakSound from "../../assets/notification/toLongBreakSound.wav";

const CountdownFocus = ({ handleNext }) => {
    const settings = useSelector(selectSettings);
    const { start, status } = useSelector(selectTimer);
    const { label, color } = useSelector(selectCurrentLabel);
    const { userEmail } = useSelector(selectUser);
    const [timerMinutes, setTimerMinutes] = useState(settings.workTime);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [newDate, setNewDate] = useState(0);
    const [pausedTime, setPausedTime] = useState();
    const dispatch = useDispatch();

    const setInitialTime = () => {
        setNewDate(new Date().getTime() + (1000 * 60 * settings.workTime));
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
                //axios to send the round to DB
                //new Date is getting the wrong date
                const now = moment();
                const date = now.format('YYYY-MM-DD');
                const weekDay = now.format('dddd');
                const roundTime = settings.workTime;

                axios.put('addround', {
                    userEmail: userEmail,
                    date: date,
                    roundTime: roundTime,
                    label: label,
                    weekDay: weekDay
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                if (!settings.automatic) {
                    dispatch(toggleStart());
                };
                if (settings.rounds > 1) {
                    dispatch(reduceRound());
                    playShort();
                    dispatch(changeTimer('short'));
                };
                if (settings.rounds === 1) {
                    playLong();
                    dispatch(changeTimer('long'));
                };
            } else {
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            };
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

        if (!start && timerMinutes === settings.workTime) {
            dispatch(changeStatus('ON_HOLD'));
        }

        if (!start && timerMinutes < settings.workTime) {
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

    //Reset button
    const handleReset = (event) => {
        if (status === 'PAUSED') {
            //set minutes and seconds to default
            setTimerMinutes(minutes => minutes = settings.workTime);
            setTimerSeconds(seconds => seconds = 0);
        }
        if (status === 'RUNNING') {
            dispatch(toggleStart());
            setTimerMinutes(minutes => minutes = settings.workTime);
            setTimerSeconds(seconds => seconds = 0);
        }
    };

    //Notifications Sounds
    const playLong = () => {
        new Audio(toLongBreakSound).play();
    };

    const playShort = () => {
        new Audio(toShortBreakSound).play();
    };

    return (
        <div className="clock-container">
            <div className="outer-ring">
                <div className="inner-ring">
                    <h1 className="clock">{timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</h1>
                    <h1 className="timer-label">Focus</h1>
                </div>
            </div>
            <div className="buttons-container">
                <button
                    style={status === "ON_HOLD" ? { pointerEvents: "none" } : null}
                    onClick={handleReset}
                    className={status === "ON_HOLD" ? 'disabled' : 'functioning'}
                >Reset</button>
                <button
                    className="round-button"
                    onClick={handleClick}>{start ? <i className="fa-solid fa-pause"></i> : <i class="fa-solid fa-play  play-button"></i>}</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default CountdownFocus;

