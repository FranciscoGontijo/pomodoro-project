import React from 'react';

import WeekChart from './weekchart';

import "./stats.css";

const DaysOfWeekStats = () => {
    return (
        <div className="week-stats-outer-container">
            <h1 className='overview-header'>Days of week</h1>
            <div className='graph-container'>
                <WeekChart/>
            </div>
            <div className='stats-buttons-container'>
                <button className="time-button">Time</button>
                <button className="sessions-button">Sessions</button>
            </div>
        </div>
    )
};

export default DaysOfWeekStats;