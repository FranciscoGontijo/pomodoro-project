import React, { useState } from "react";
import UserPool from "./UserPool";
import axios from "axios";

import "./signup.css"

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
            //need to improve but is working at CRUD server 
            axios.post('/', { "userId": email })
                .then(res => console.log(res.data))
                .catch(err => console.error(err));

            //login user
        });
        
        handleClick(e);
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={onSubmit}>
                <h2>Sign in</h2>
            <div class="group">
                    <input 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text" 
                        required></input>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Email</label>
                </div>
                <div class="group">
                    <input 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="text" 
                        required></input>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Password</label>
                </div>
                <button className="signin-btn" type="submit">Sign In</button>
                <button className="change-btn" onClick={handleChange}>change to login</button>
            </form>
        </div>
    )
};

export default Signup;