import React from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectLabelList, deleteLabel, changeLabel } from "../../slices/labeltagslice";
import { selectUser } from "../../slices/userSlice";

import './labellist.css'

const LabelList = ({ goToForm, closeDisplay }) => {
    const labelList = useSelector(selectLabelList);
    const { userEmail } = useSelector(selectUser);
    const dispatch = useDispatch();

    //Delete Label
    const deleteLabelFromDB = (e) => {
        e.preventDefault();

        const label = e.target.id;

        //Delete from slice
        dispatch(deleteLabel(label));
        if (labelList.length <= 1) {
            dispatch(changeLabel({
                label: 'SELECT LABEL',
                color: 'rgb(104, 85, 224)'
            }));
            closeDisplay();
        }

        //Delete from database
        axios.put('/deletelabel', {
            userEmail: userEmail,
            label: label
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    };

    //Select current label
    const selectLabel = (e) => {
        e.preventDefault();
        const labelName = e.target.id;
        const index = labelList.findIndex(labelObj => labelObj.label === labelName);
        const labelSelected = labelList[index];
        dispatch(changeLabel(labelSelected));
        closeDisplay();
    };

    return (
        <div className="label-list-container">
            <span>Labels</span><i className="fa-solid fa-xmark x-mark" onClick={closeDisplay}></i>
            <ul>
                {labelList.map(({ label, color }, index) => {
                    return <div className="list-div">
                        <li key={index} id={label} onClick={selectLabel}>
                            <span style={{ backgroundColor: color }} className="color-display"></span>
                            {label}
                        </li>
                        <i id={label} onClick={deleteLabelFromDB} className="fa-solid fa-trash"></i>
                    </div>
                })}
                <li className="add-button" onClick={goToForm}><i className="fa-solid fa-plus"></i><span className="add-button-text">Add new Label</span></li>
            </ul>
        </div>
    )
};

export default LabelList;
