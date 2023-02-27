import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentLabel, selectLabelList } from '../../slices/labeltagslice';
import "./labeltag.css"

import LabelForm from './labelform';
import LabelList from './labellist';

const LabelTag = () => {
    const labelList = useSelector(selectLabelList);
    const { label, color } = useSelector(selectCurrentLabel);
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

    return (
        <div className="labeltag">
            <button onClick={openDisplay} style={{ color: color }} className={"label-button"}>
                <i className={"fa-solid fa-tag " + color}></i> {label}
            </button>
            {displayForm && <LabelForm closeDisplay={closeDisplay} />}
            {displayList &&
                <LabelList
                    closeDisplay={closeDisplay}
                    goToForm={goToForm}
                />}
        </div>
    )
};

export default LabelTag;