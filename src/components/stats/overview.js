import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectDateStats } from "../../slices/statsslice";

import './stats.css'

const Overview = () => {
    const dateStats = useSelector(selectDateStats);
    const [total, setTotal] = useState(0);

    const getTotalTime = () => {
        let totalTime = 0;
        dateStats.forEach(object => {
            totalTime += object.roundTime * object.rounds
        });
        return totalTime
    };

    //get monthly stats

    //get weekly stats

    //get daily stats

    useEffect(() => {
        setTotal(total => total = getTotalTime());
    }, [dateStats])


    return (
        <div>
            <div className="overview-container">
                <h1>Overview</h1>
                <div className="overview-stats-container">
                    <div className="time-stats">
                        <i class="fa-solid fa-calendar-day"></i>
                        <h2>time</h2>
                        <p>Today</p>
                    </div>
                    <div className="time-stats">
                        <i class="fa-solid fa-calendar-week"></i>
                        <h2>time</h2>
                        <p>Week</p>
                    </div>
                    <div className="time-stats">
                        <i class="fa-regular fa-calendar"></i>
                        <h2>time</h2>
                        <p>Month</p>
                    </div>
                    <div className="time-stats">
                        <i class="fa-solid fa-equals"></i>
                        <h2>{total}</h2>
                        <p>Total</p>
                    </div>
                </div>
                <button onClick={() => console.log(dateStats)} className="time-button">Time</button>
                <button className="sessions-button">Sessions</button>
            </div>
        </div>
    )
};

export default Overview;