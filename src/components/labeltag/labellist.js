import React from "react";
import { useSelector } from "react-redux";
import { selectLabelList, selectLabel  } from "./labeltagslice";

import LabelForm from "./labelform";

import './labellist.css'

const LabelList = ({handleCreate, handleSelect, closeDisplay, deleteLabel}) => {
    const labelList = useSelector(selectLabelList);
    const label = useSelector(selectLabel);

    //Icons functionality
    //Create edit label
    //Create delete label

    return (
        <div className="label-list-container">
            <span>Labels</span><i class="fa-solid fa-xmark x-mark" onClick={closeDisplay}></i>
            <ul>
            {labelList.map((label, index)=> {
                let color = label.color
                return <li id={index} onClick={handleSelect}><span style={{backgroundColor: color}} className="color-display"></span>{label.label}<i onClick={deleteLabel} class="fa-solid fa-trash"></i></li>
            })}
            <li className="add-button" onClick={handleCreate}><i class="fa-solid fa-plus"></i><span className="add-button-text">Add new Label</span></li>
            </ul>
        </div>
    )
}; 

export default LabelList;
