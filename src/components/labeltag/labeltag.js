import React, { useState } from 'react';
<<<<<<< HEAD
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentLabel, selectLabelList, changeLabel, deleteLabel } from './labeltagslice';
=======
import { useSelector } from "react-redux";
import { selectCurrentLabel, selectLabelList } from '../../slices/labeltagslice';
>>>>>>> newBranchTest
import "./labeltag.css"

import LabelForm from './labelform';
import LabelList from './labellist';

//Need to always keep the current label selected an not update to SELECT LABEL TAG when refresh the page...
//If labellist.length < 0 ADD LABEL

const LabelTag = () => {
    const labelList = useSelector(selectLabelList);
    const { label, color } = useSelector(selectCurrentLabel);
    const [displayForm, setDisplayForm] = useState(false);
    const [displayList, setDisplayList] = useState(false);

<<<<<<< HEAD
    //Open Label List or Label Form
    const openLabelList = () => {
=======
    const openDisplay = () => {
>>>>>>> newBranchTest
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
<<<<<<< HEAD
    const openLabelForm = () => {
=======
    const goToForm = () => {
>>>>>>> newBranchTest
        setDisplayForm(true);
        setDisplayList(false);
    };

<<<<<<< HEAD
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
            <button onClick={openLabelList} style={{color: color}} className={"label-button"}>
                <i className={"fa-solid fa-tag " + color}></i> {label}
            </button>
            { displayForm && <LabelForm closeDisplay={closeDisplay}/>}
            { displayList && 
            <LabelList 
                deleteLabel={handleDelete}
                closeDisplay={closeDisplay}
                openForm={openLabelForm}
                selectLabel={selectLabel}/>}
=======
    return (
        <div className="labeltag">
            <button onClick={openDisplay} style={{ color: color }} className={"label-button"}>
                <i className={"fa-solid fa-tag " + color}></i> {labelList.length > 0 ? label : "ADD LABEL"}
            </button>
            {displayForm && <LabelForm closeDisplay={closeDisplay} />}
            {displayList &&
                <LabelList
                    closeDisplay={closeDisplay}
                    goToForm={goToForm}
                />}
>>>>>>> newBranchTest
        </div>
    )
};

export default LabelTag;