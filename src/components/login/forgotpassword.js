import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

import UserPool from "../../util/UserPool";

const ForgotPasswordForm = ({ handleClick }) => {
    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
    const [email, setEmail] = useState('');

    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const getUser = () => {
        return new CognitoUser({
            Username: email,
            Pool: UserPool
        });
    }

    const sendCode = (event) => {
        event.preventDefault();

        getUser().forgotPassword({
            onSuccess: (data) => {
                console.log('onSuccess', data);
            },
            onFailure: (err) => {
                console.log('onFailure', err);
            },
            inputVerificationCode: (data) => {
                console.log('Input code', data);
                setStage(2);
            }
        })
    };

    const resetPassword = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.error('Passwords are not the same')
            return;
        };

        getUser().confirmPassword(code, password, {
            onSuccess: (data) => {
                console.log('onSuccess', data);
                handleClick(event);
            },
            onFailure: (err) => {
                console.log('onFailure', err);
            }
        })
    };

    return (
        <>
            {stage === 1 &&
                <div className="forgotPassword-container">
                    <form className="forgotPassword-form" onSubmit={sendCode}>
                        <h2>Forgot password</h2>
                        <i className="fa-solid fa-xmark x-mark-password" onClick={handleClick}></i>
                        <div className="group">
                            <input
                                className="input"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                type="text"
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="label">Email address</label>
                        </div>
                        <button
                            className="reset-password-btn"
                            type="submit">Send verification code</button>
                    </form>
                </div>
            }

            {stage === 2 &&
                <div className="newPassword-container">
                    <form className="forgotPassword-form" onSubmit={resetPassword}>
                        <h2>Forgot password</h2>
                        <i className="fa-solid fa-xmark x-mark-new-password" onClick={handleClick}></i>
                        <div className="group">
                            <input
                                className="input"
                                value={code}
                                onChange={event => setCode(event.target.value)}
                                type="text"
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="label">Verification code</label>
                        </div>
                        <div className="group">
                            <input
                                className="input"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                type="password"
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="label">New password</label>
                        </div>
                        <div className="group">
                            <input
                                className="input"
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                type="password"
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="label">Confirm password</label>
                        </div>
                        <button
                            className="reset-password-btn"
                            type="submit">Change password</button>
                    </form>
                </div>
            }
        </>
    )
};

export default ForgotPasswordForm;