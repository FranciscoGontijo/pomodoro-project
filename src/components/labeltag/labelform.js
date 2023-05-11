import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLabel, addLabel } from '../../slices/labeltagslice';
import { selectUser } from "../../slices/userSlice"


import './labelform.css';

const LabelForm = ({ closeDisplay }) => {
    const [label, setLabel] = useState('');
    const [color, setColor] = useState('black');
    const { userEmail } = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleColorChange = (e) => {
        setColor(color => color = e.target.value);
    };

    const handleLabelChange = (e) => {
        setLabel(label => label = e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changeLabel({
            label: label,
            color: color
        }));
        dispatch(addLabel({
            label: label,
            color: color
        }));
        axios.put('/addlabel', {
            label: label,
            color: color,
            userEmail: userEmail
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
        setLabel('');
        closeDisplay();
    };

    //Add label to the database


    return (
        <div className="edit-label-container">
            <h3>Create Label</h3><i className="fa-solid fa-xmark x-mark" onClick={closeDisplay}></i>
            <form onSubmit={handleSubmit}>
                <input
                    className="input-label"
                    type="text"
                    value={label}
                    onChange={handleLabelChange}
                    required />
                <span className="highlight-label"></span>
                <label className="label-label">Label name</label>
                <br />
                <select className="select-input-label" name="colors" id="colors" onChange={handleColorChange} required>
                    <option>Choose a color</option>
                    <option value="red">Red</option>
                    <option value="pink">Pink</option>
                    <option value="purple">Purple</option>
                    <option value="indigo">Indigo</option>
                    <option value="blue">Blue</option>
                    <option value="lightblue">Light Blue</option>
                    <option value="cyan">Cyan</option>
                    <option value="teal">Teal</option>
                    <option value="green">Green</option>
                    <option value="lightgreen">Light Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="brown">Brown</option>
                    <option value="gray">Gray</option>
                </select>
                <br />
                <button className="confirm-button" type="submit">CONFIRM</button>
            </form>
        </div>
    )
};

export default LabelForm;