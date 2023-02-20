import React from "react";
import { useSelector } from "react-redux";
import { selectLabelList } from "./labeltagslice";

import './labellist.css'

const LabelList = () => {
    const labelList = useSelector(selectLabelList);
    return (
        <div className="label-list-container">
            <ul>
            {labelList.map(label => {
                return <li><button>{label.label}</button><i class="fa-solid fa-pen"></i><i class="fa-solid fa-trash"></i></li>
            })}
            </ul>
        </div>
    )
}; 

export default LabelList;
