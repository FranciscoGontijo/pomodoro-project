import React from "react";

import './stats.css'

const Overview = () => {

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
                        <h2>time</h2>
                        <p>Total</p>
                    </div>
                </div>
                <button className="time-button">Time</button>
                <button className="sessions-button">Sessions</button>
            </div>
        </div>
    )
};

export default Overview;