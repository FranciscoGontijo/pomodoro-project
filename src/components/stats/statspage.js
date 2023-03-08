import React from "react";

import { selectStats } from "../../slices/statsslice";

import Overview from "./overview.js";
import DaysOfWeekStats from "./daysofweek";
import LabelStatsGraph from "./labelsgraph";

import './stats.css';

const StatsPage = () => {

    return (
        <div className="stats-page-container">
            <Overview />
            <DaysOfWeekStats />
            <LabelStatsGraph />
        </div>
    )
};

export default StatsPage;