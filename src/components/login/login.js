import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { createUser } from "./userSlice"

import "./login.css"

const Login = () => {
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
                dispatch(createUser({userEmail: email}));
                //get stats
                //to make requests your id is your email
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
        <div className="signup-container">
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                    <label htmlFor="password">Password:</label>
                <input 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                    <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login;