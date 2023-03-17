import React from 'react';

import LabelChart from './labelchart';

const LabelStatsGraph = () => {

    return (
        <div className='labels-stats-outer-container'>
            <h1 className='label-stats-header'>Labels chart</h1>
            <div className='label-graph-container'>
                <LabelChart/>
            </div>
        </div>
    )
};

export default LabelStatsGraph;