import React, { useState } from "react";
import UserPool from "../../util/UserPool";
import axios from "axios";

import "./login.css"

const Signup = ({ handleChange, handleClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            };
            console.log(data);
            //POST request to create a new user using email as unique identifier 

            axios.post('/createnewuser', { "userEmail": email })
                .then(res => console.log(res.data))
                .catch(err => console.error(err));

            //login user not possible becuase you need to verify the email first
        });
        handleClick(e);
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={onSubmit}>
                <h2>Sign in</h2>
                <i className="fa-solid fa-xmark x-mark-signup" onClick={handleClick}></i>
            <div className="group">
                    <input 
                        className="input"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text" 
                        required></input>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="label">Email</label>
                </div>
                <div className="group">
                    <input 
                        className="input"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password" 
                        required></input>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="label">Password</label>
                </div>
                <button className="signin-btn" type="submit">Sign In</button>
                <button className="change-btn" onClick={handleChange}>change to login</button>
            </form>
        </div>
    )
};

export default Signup;