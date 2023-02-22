import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentLabel, selectLabelList, changeLabel, deleteLabel } from './labeltagslice';
import "./labeltag.css"

import LabelForm from './labelform';
import LabelList from './labellist';

const LabelTag = () => {
    const labelList = useSelector(selectLabelList);
    const { label, color} = useSelector(selectCurrentLabel);
    const [displayForm, setDisplayForm] = useState(false);
    const [displayList, setDisplayList] = useState(false);
    const dispatch = useDispatch();

    const openDisplay = () => {
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
    const goToForm = () => {
        setDisplayForm(true);
        setDisplayList(false);
    };

    //Select label to be the current one
    const selectLabel = (e) => {
        e.preventDefault();
        const index = e.target.id;
        const labelSelected = labelList[index];
        dispatch(changeLabel(labelSelected));
        setDisplayList(false);
    };

    //Delete label from the label list using icon
    const handleDelete = (e) => {
        e.preventDefault();
        const index = e.target.id;
        dispatch(deleteLabel(index));
        if (labelList.length <= 1) {
            dispatch(changeLabel({
                label: 'ADD LABEL',
                color: 'rgb(104, 85, 224)'
            }));
            setDisplayList(false);
        }
    };

    return (
        <div className="labeltag">
            <button onClick={openDisplay} style={{color: color}} className={"label-button"}>
                <i className={"fa-solid fa-tag " + color}></i> {label}
            </button>
            { displayForm && <LabelForm closeDisplay={closeDisplay}/>}
            { displayList && 
            <LabelList 
                deleteLabel={handleDelete}
                closeDisplay={closeDisplay}
                goToForm={goToForm}
                selectLabel={selectLabel}/>}
        </div>
    )
};

export default LabelTag;