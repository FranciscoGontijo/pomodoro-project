import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectLabelStats } from "../../slices/statsslice";

import "./statscomponents.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = '#b7b7b7';
ChartJS.defaults.font.size = 16;


const LabelChart = () => {
    const labelStats = useSelector(selectLabelStats);
    const [graphData, setGraphData] = useState();



    const normalizeGraphData = () => {
        const list = labelStats.map((labelStats) => {
            let totalTime = 0;
            labelStats.dates.map((dates) => {
                totalTime += dates.roundTime * dates.rounds
            });
            return { label: labelStats.label, totalTime: totalTime, color: labelStats.color }
        });

        const data = {
            labels: list.map((obj) => obj.label),
            datasets: [{
                label: "Time(min) ",
                data: list.map((obj) => obj.totalTime),
                backgroundColor: list.map((obj) => obj.color),
                borderColor: ['rgb(40, 40, 40)']
            }]
        };

        return data
    };

    useEffect(() => {
        setGraphData(normalizeGraphData());
    }, [labelStats]);

    if (!graphData) return null;


    return <Doughnut data={graphData} />

};

export default LabelChart;