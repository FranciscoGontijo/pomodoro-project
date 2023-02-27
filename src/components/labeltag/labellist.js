import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectLabelList, deleteLabel, changeLabel } from "../../slices/labeltagslice";
import { selectUser } from "../../slices/userSlice";
import UserPool from "../login/UserPool";

import './labellist.css'

const LabelList = ({ goToForm, selectLabel, closeDisplay }) => {
    const labelList = useSelector(selectLabelList);
    const { userEmail } = useSelector(selectUser);
    const dispatch = useDispatch();
    const user = UserPool.getCurrentUser();


    //If user logged in then fetch the label list from the database:
    //Dispatch the fetched label list to labelList


    //Delete Label
    const deleteLabelFromDB = (e) => {
        e.preventDefault();

        const label = e.target.id;

        //Delete from redux
        dispatch(deleteLabel(label));
        if (labelList.length <= 1) {
            dispatch(changeLabel({
                label: 'ADD LABEL',
                color: 'rgb(104, 85, 224)'
            }));
            closeDisplay();
        }

        //Delete from database
        axios.put('/deletelabel', {
            userEmail: userEmail,
            label: label
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }


    return (
        <div className="label-list-container">
            <span>Labels</span><i class="fa-solid fa-xmark x-mark" onClick={closeDisplay}></i>
            <ul>
                {labelList.map(({ label, color }, index) => {
                    return <div className="list-div">
                        <li key={index} id={label} onClick={selectLabel}>
                            <span style={{ backgroundColor: color }} className="color-display"></span>
                            {label}
                        </li>
                        <i id={label} onClick={deleteLabelFromDB} class="fa-solid fa-trash"></i>
                    </div>
                })}
                <li className="add-button" onClick={goToForm}><i class="fa-solid fa-plus"></i><span className="add-button-text">Add new Label</span></li>
            </ul>
        </div>
    )
};

export default LabelList;
