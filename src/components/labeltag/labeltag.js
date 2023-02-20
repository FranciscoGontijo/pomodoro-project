import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectLabel, selectLabelList, changeLabel } from './labeltagslice';
import "./labeltag.css"

import LabelForm from './labelform';
import LabelList from './labellist';

const LabelTag = () => {
    const labelList = useSelector(selectLabelList);
    const { label, color} = useSelector(selectLabel);
    const [displayForm, setDisplayForm] = useState(false);
    const [displayList, setDisplayList] = useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (labelList.length > 0) {
            setDisplayList(displayList ? false : true);
        } else {
            setDisplayForm(displayForm ? false : true);
        }
    };


    const closeDisplay = () => {
        setDisplayForm(false);
        setDisplayList(false);
    }

    //Show LabelForm instead of LabelList
    const handleCreate = () => {
        setDisplayForm(true);
        setDisplayList(false);
    };

    //Select label to be the current one
    const handleSelect = (e) => {
        e.preventDefault();
        const index = e.target.id;
        const labelToAdd = labelList[index];
        dispatch(changeLabel(labelToAdd));
        setDisplayList(false);
    };

    return (
        <div className="labeltag">
            <button onClick={handleClick} style={{color: color}} className={"label-button"}>
                <i className={"fa-solid fa-tag " + color}></i> {label}
            </button>
            { displayForm && <LabelForm closeDisplay={closeDisplay}/>}
            { displayList && 
            <LabelList 
                closeDisplay={closeDisplay}
                handleCreate={handleCreate}
                handleSelect={handleSelect}/>}
        </div>
    )
};

export default LabelTag;