import React, { useState } from "react";
import './labelform.css'

const LabelForm = (props) => {
    const { submitColorChange, submitNameChange, handleClick } = props;
    const [label, setLabel] = useState('');
    const [color,setColor] = useState('gray');

    const handleColorChange = (e) => {
        setColor(color => color = e.target.value);
    };

    const handleLabelChange = (e) => {
        setLabel(label => label = e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitColorChange(color);
        submitNameChange(label);
        setLabel('');
        handleClick();
    };

    return (
        <div className="edit-label-container">
            <h3>Edit label</h3><i class="fa-solid fa-xmark" onClick={handleClick}></i>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Label name" value={label} onChange={handleLabelChange} required />
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