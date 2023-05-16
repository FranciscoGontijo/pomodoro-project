import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDateStats } from "../../slices/statsslice";

import "./statscomponents.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = '#b7b7b7';
ChartJS.defaults.font.size = 16;

const WeekChart = () => {
    const dateStats = useSelector(selectDateStats);
    const [mondayTime, setMondayTime] = useState(0);
    const [tuesdayTime, setTuesdayTime] = useState(0);
    const [wednesdayTime, setWednesdayTime] = useState(0);
    const [thursdayTime, setThursdayTime] = useState(0);
    const [fridayTime, setFridayTime] = useState(0);
    const [saturdayTime, setSaturdayTime] = useState(0);
    const [sundayTime, setSundayTime] = useState(0);

    const getMondayStats = () => {
        const weekDay = 'Monday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    const getTuesdayStats = () => {
        const weekDay = 'Tuesday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    const getWednesdayStats = () => {
        const weekDay = 'Wednesday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    const getThursdayStats = () => {
        const weekDay = 'Thursday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    const getFridayStats = () => {
        const weekDay = 'Friday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    const getSaturdayStats = () => {
        const weekDay = 'Saturday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };
    
    const getSundayStats = () => {
        const weekDay = 'Sunday';
        let totalTime = 0;
        dateStats.forEach(object => {
            const objWeekDay = object.weekDay;
            if (objWeekDay === weekDay) {
                totalTime += object.roundTime * object.rounds;
            };
        });
        return totalTime
    };

    useEffect(() => {
        setMondayTime(getMondayStats());
        setTuesdayTime(getTuesdayStats());
        setWednesdayTime(getWednesdayStats());
        setThursdayTime(getThursdayStats());
        setFridayTime(getFridayStats());
        setSaturdayTime(getSaturdayStats());
        setSundayTime(getSundayStats());
    }, [dateStats]);

    const data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: "Time(min) ",
            data: [sundayTime, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, saturdayTime],
            backgroundColor: ['rgb(36, 80, 87)', 'rgb(193, 170, 227)', 'rgb(123, 149, 87)', 'rgb(123, 149, 155)', 'rgb(146, 64, 105)', 'rgb(34, 149, 155)', 'rgb(191, 84, 72)'],
            borderColor: ['rgb(40, 40, 40)']
        }]
    };

    return (
        <>
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                  }}
            />
        </>
    )
};

export default WeekChart;