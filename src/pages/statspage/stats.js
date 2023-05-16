import React from "react";
import UserPool from "../../util/UserPool";

import "./stats.css";

import Overview from "../../components/stats/overview.js";
import DaysOfWeekStats from "../../components/stats/daysofweek";
import LabelStatsGraph from "../../components/stats/labelsgraph";

const Stats = () => {
    const user = UserPool.getCurrentUser();

    return (
        <div className="stats-container">
            {user === null ?
                <div className="stats-placeholder">
                    <h3>Nothing to show here!</h3>
                    <p>Log In to retrive your stats</p>
                </div> :
                <div className="stats-page-container">
                    <Overview />
                    <DaysOfWeekStats />
                    <LabelStatsGraph />
                </div>}
        </div>
    )
};

export default Stats;

//Stats is and requested page that appears if the user is logged in.
//Basicly every data/ information that we will use in this page is requested to a server and will only be answered if the user is logged in
//Will request unique information for each User
//To do that we need a server / database
//Each time that one stats is changed it need to send a POST request to the server updating the stats
//And one GET request to the server to update the page
