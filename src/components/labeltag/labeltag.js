import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectLabel, selectLabelList } from './labeltagslice';
import "./labeltag.css"

import LabelForm from './labelform';
import LabelList from './labellist';

const LabelTag = () => {
    const labelList = useSelector(selectLabelList);
    const { label, color} = useSelector(selectLabel);
    const [display, setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay(display ? false : true);
    };

    return (
        <div className="labeltag">
            <button onClick={handleClick} className={"label-button " + color}>
                <i className={"fa-solid fa-tag " + color}></i> {label}
            </button>
            { display && <LabelForm handleClick={handleClick}/>}
            {labelList !== [] && <LabelList/>}
        </div>
    )
};

export default LabelTag;