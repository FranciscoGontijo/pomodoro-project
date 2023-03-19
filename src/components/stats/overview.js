import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';

import { selectDateStats } from "../../slices/statsslice";

import './stats.css'

const Overview = () => {
    const dateStats = useSelector(selectDateStats);
    const [allTime, setAllTime] = useState(0);
    const [monthlyTime, setMonthlyTime] = useState(0);
    const [weeklyTime, setWeeklyTime] = useState(0);
    const [dailyTime, setDailyTime] = useState(0);

    const getAllTimeTotal = () => {
        let totalTime = 0;
        dateStats.forEach(object => {
            totalTime += object.roundTime * object.rounds;
        });
        return totalTime
    };

    //get monthly stats
    const getMonthlyTime = () => {
        const now = moment().month() + 1;
        let totalTime = 0;
        dateStats.forEach(object => {
            const objDate = object.date;
            const month = moment(objDate).month() + 1;
            if (month === now) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };


    //get weekly stats
    const getWeeklyTime = () => {
        const now = moment().format('YYYY-MM-DD');
        const thisWeekOfMonth = moment(now).week() - moment(now).startOf('month').week() + 1;
        let totalTime = 0;
        dateStats.forEach(object => {
            const objDate = object.date;
            const objWeekOfMonth = moment(objDate).week() - moment(objDate).startOf('month').week() + 1;
            if (objWeekOfMonth === thisWeekOfMonth) {
                totalTime += object.roundTime * object.rounds;
            }
        });
        return totalTime
    };

    //get daily stats
    const getDailyTime = () => {
        const now = moment().format('YYYY-MM-DD');
        let totalTime = 0;
        dateStats.forEach(object => {
            if (object.date === now) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    useEffect(() => {
        setAllTime(total => total = getAllTimeTotal());
        setMonthlyTime(total => total = getMonthlyTime());
        setWeeklyTime(total => total = getWeeklyTime());
        setDailyTime(total => total = getDailyTime());

    });

    return (
            <div className="overview-container">
                <h1>Overview (min)</h1>
                <div className="overview-stats-container">
                    <div className="time-stats">
                        <i class="fa-solid fa-calendar-day overview-icons"></i>
                        <h2>{dailyTime}</h2>
                        <p>Today</p>
                    </div>
                    <div className="time-stats">
                        <i class="fa-solid fa-calendar-week overview-icons"></i>
                        <h2>{weeklyTime}</h2>
                        <p>Week</p>
                    </div>
                    <div className="time-stats">
                        <i class="fa-regular fa-calendar overview-icons"></i>
                        <h2>{monthlyTime}</h2>
                        <p>Month</p>
                    </div>
                    <div className="time-stats">
                        <i class="fa-solid fa-equals overview-icons"></i>
                        <h2>{allTime}</h2>
                        <p>Total</p>
                    </div>
                </div>
            </div>
    )
};

export default Overview;