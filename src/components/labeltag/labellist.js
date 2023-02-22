import React from "react";
import { useSelector } from "react-redux";
import { selectLabelList  } from "./labeltagslice";

import './labellist.css'

const LabelList = ({goToForm, selectLabel, closeDisplay, deleteLabel}) => {
    const labelList = useSelector(selectLabelList);

    return (
        <div className="label-list-container">
            <span>Labels</span><i class="fa-solid fa-xmark x-mark" onClick={closeDisplay}></i>
            <ul>
            {labelList.map(({ label, color }, index)=> {
                return <div className="list-div"><li id={index} onClick={selectLabel}><span style={{backgroundColor: color}} className="color-display"></span>{label}</li><i id={index} onClick={deleteLabel} class="fa-solid fa-trash"></i></div>
            })}
            <li className="add-button" onClick={goToForm}><i class="fa-solid fa-plus"></i><span className="add-button-text">Add new Label</span></li>
            </ul>
        </div>
    )
}; 

export default LabelList;
