import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings } from '../timersettings/settingsslice'
import { toggleStart, changeStatus, changeTimer, selectTimer } from "./timerslice";

const Countdown = () => {
    const settings = useSelector(selectSettings);
    const { start, status } = useSelector(selectTimer);
    const [timerMinutes, setTimerMinutes] = useState(settings.workTime);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [newDate, setNewDate] = useState(0);
    const [pausedTime, setPausedTime] = useState();
    const dispatch = useDispatch();

    // interval variable to setInterval on
    let interval;

    // get new Date when click button. add 25 minutes, and use that number to check with date now...
    const setInitialTime = () => {
        setNewDate(new Date().getTime() + (1000 * 60 * settings.workTime));
    };

    const startTimer = () => {
        interval = setInterval(() => {
            const now = Date.now();
            const distance = newDate - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(interval);
            } else {
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 950);
    };

    useEffect(() => {
        if (start) {
            startTimer();
            return () => {
                clearInterval(interval);
            }
        }
    });


    // make another timer which counts +1 every second and add that count to the distance or to the newDate when unpaused:
    // let count = 0;
    // let countInterval;
    //
    // const countPaused = () => {
    //     countInterval = setInterval(() => {
    //         count++;
    //     }, 1000);
    // };
    //
    // useEffect(() => {
    //     if (status === 'PAUSED') {
    //         countPaused();
    //         return () => {
    //             clearInterval(interval);
    //         }
    //     }
    // });
    //
    // const handleUnpause = () => {
    //     clearInterval(countInterval);
    //     console.log('Count: ' + count);
    //     setNewDate(newDate => newDate + (count * 1000));
    //     count = 0;
    // };

    //--------------------------------------------------------------------------------------- DIFFERENT WAYS TO RESOLVE THE PROBLEM

    //when paused needs to uptdade the newDate and distance... 
    // when paused, getTime when it was paused and add that diference time when unpaused to the distance...
    // paused = getTime() unpaused = getTime() difference = unpaused - paused ... add that to the distance.

    // const handlePause = () => {
    //     setPausedTime(new Date().getTime());
    // };

    // const handleUnpause = () => {
    //     setUnpausedTime(new Date().getTime());
    //     const diference = unpausedTime - pausedTime;
    //     setNewDate(date => date + diference);
    // };

    //--------------------------------------------------------------------------
    //Third way is to resolve the problem inside the handleClick funtion

    const pause = () => {
        setPausedTime(new Date().getTime());
    };

    const unpause = () => {
        const unpausedTime = new Date().getTime()
        const diference = unpausedTime - pausedTime;
        setNewDate(date => date + diference);
    };

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


    //Need to changeStatus in this timer

    return (
        <div>
            <p>New Timer:</p>
            <h1>{newDate}</h1>
            <p>{typeof newDate}</p>
            <h1>{timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</h1>
            <button onClick={handleClick}>{start ? 'Pause' : 'Start'}</button>
        </div>
    );
};

export default Countdown;

