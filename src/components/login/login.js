import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { createUser } from "./userSlice"

import "./login.css";

const Login = ({ handleChange, handleClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log('onSuccess: ', data);
                dispatch(createUser({ userEmail: email }));
                handleClick(e);
                //get stats
                //to make requests your id is your email
                //close the login form

            },
            onFailure: (err) => {
                console.log('onFailure: ', err);
            },
            newPasswordRequired: (data) => {
                console.log('newPasswordRequired: ', data);
            }
        });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h2>Log in</h2>
                <i class="fa-solid fa-xmark x-mark-login" onClick={handleClick}></i>
                <div class="group">
                    <input 
                        className="input"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text" 
                        required></input>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className="label">Email</label>
                </div>
                <div class="group">
                    <input 
                        className="input"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="text" 
                        required></input>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className="label">Password</label>
                </div>
                <button className="login-btn" type="submit">Login</button>
                <button className="change-btn" onClick={handleChange}>change to signup</button>
            </form>
        </div>
    )
};

export default Login;