import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentLabel, selectLabelList } from '../../slices/labeltagslice';
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

    let tagRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!tagRef.current.contains(e.target)) {
                closeDisplay();
            }
        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

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
    //close display when clicked outside

    //Show LabelForm instead of LabelList
    const goToForm = () => {
        setDisplayForm(true);
        setDisplayList(false);
    };

    return (
        <div ref={tagRef} className="labeltag">
            <button onClick={openDisplay} style={{ color: color }} className={"label-button"}>
                <i className={"fa-solid fa-tag " + color}></i> {labelList.length > 0 ? label : "ADD LABEL"}
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