import React, { useState } from 'react';
import "./labeltag.css"

import LabelForm from './labelform';

const LabelTag = () => {
    const [display, setDisplay] = useState(false);
    const [labelColor, setColor] = useState('gray');
    const [labelName, setLabelName] = useState('ADD LABELTAG');

    const handleClick = () => {
        setDisplay(display ? false : true);
    };

    const handleColorChange = (value) => {
        setColor(color => color = value);
    };

    const handleNameChange = (value) => {
        setLabelName(label => label = value);
    };

    return (
        <div className="labeltag">
            <button onClick={handleClick} className={"label-button " + labelColor}>
                <i className={"fa-solid fa-tag " + labelColor}></i> {labelName}
            </button>
            { display && <LabelForm 
                submitNameChange={handleNameChange}
                submitColorChange={handleColorChange}
                handleClick={handleClick}
                className={display} />}
        </div>
    )
};

export default LabelTag;