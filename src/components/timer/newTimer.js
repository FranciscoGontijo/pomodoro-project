import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings } from '../timersettings/settingsslice'
import { toggleStart, changeStatus, changeTimer, selectTimer } from "./timerslice";

const Countdown = () => {
    const { workTime } = useSelector(selectSettings);
    const { start, status, title } = useSelector(selectTimer);
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [newDate, setNewDate] = useState();
    const [pausedTime, setPausedTime] = useState();
    const [unpausedTime, setUnpausedTime] = useState();
    const [distance, setDistance] = useState();
    const dispatch = useDispatch();
    
    // get new Date when click button. add 25 minutes, and use that number to check with date now...
    const getDate = () => {
        setNewDate(new Date().getTime()+(1000 * 60 * workTime));
    }

    let interval;

    const startTimer = () => {

        interval = setInterval(() => {
            const now = new Date().getTime();
            setDistance(newDate - now);

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(interval);
            } else {
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval);
        }
    });

    

    //when paused needs to uptdade the newDate and distance... 
    // when paused, getTime when it was paused and add that diference time when unpaused to the distance...
    // paused = getTime() unpaused = getTime() difference = unpaused - paused ... add that to the distance.
    //genius

    // const handlePause = () => {
    //     setPausedTime(new Date().getTime());
    // };

    // const handleUnpause = () => {
    //     setUnpausedTime(new Date().getTime());
    //     const diference = unpausedTime - pausedTime;
    //     setDistance(distance => distance + diference);
    // };

    // const handleClick = () => {
    //     getDate();
    //     dispatch(toggleStart());
    // };



    return (
        <div>
            <p>New Timer:</p>
            <h1>{newDate}</h1>
            <p>{typeof newDate}</p> 
            <h3>Minutes: {timerMinutes}</h3>
            <h3>Seconds: {timerSeconds}</h3>
            <button onClick={getDate}>Start</button>
        </div>
    );
};

export default Countdown;

