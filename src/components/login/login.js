import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import axios from "axios";

import UserPool from "../../util/UserPool";

import { createUser } from "../../slices/userSlice";
import { fulfilLabelList } from "../../slices/labeltagslice";
import { fulfilDateStats } from "../../slices/statsslice";

import "./login.css";

const Login = ({ handleChange, handleClick, openForgotPasswordForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
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
                axios.get(`/userstats/${email}`)
                    .then((response) => {
                        dispatch(fulfilDateStats(response.data));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                axios.get(`/labellist/${email}`)
                    .then((response) => {
                        dispatch(fulfilLabelList(response.data));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onFailure: (err) => {
                console.log('onFailure: ', err);
                setWrongPassword(true);
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
                <i className="fa-solid fa-xmark x-mark-login" onClick={handleClick}></i>
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
                <button className="forgot-password-btn" onClick={openForgotPasswordForm} type="button">Forgot password?</button>
                <button className="login-btn" type="submit" >Login</button>     
                <button className="change-btn" onClick={handleChange} type="button">change to signup</button>
                {wrongPassword && <p style={{color: "white", margin: "0"}}>wrong password!</p>}
            </form>
            
        </div>
    )
};

export default Login;