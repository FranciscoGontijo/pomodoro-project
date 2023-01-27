import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectLabel, changeLabel } from './labeltagslice';
import "./labeltag.css"

import LabelForm from './labelform';

const LabelTag = () => {
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
        </div>
    )
};

export default LabelTag;