import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeLabel } from './labeltagslice';
import './labelform.css'

const LabelForm = ({ handleClick }) => {
    const [label, setLabel] = useState('');
    const [color,setColor] = useState('black');
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
        }))
        setLabel('');
        handleClick();
    };

    return (
        <div className="edit-label-container">
            <h3>Edit label</h3><i class="fa-solid fa-xmark x-mark" onClick={handleClick}></i>
            <form onSubmit={handleSubmit}>
                <input 
                    className="input"
                    type="text" 
                    placeholder="Label name" 
                    value={label} 
                    onChange={handleLabelChange} 
                    required />
                <br />
                <select name="colors" id="colors" onChange={handleColorChange} required>
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
                <button type="submit">CONFIRM</button>
            </form>
        </div>
    )
};

export default LabelForm;