import React, { useState } from "react";
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from "./UserPool";

import './login.css'

const Logout = () => {
    const handleLogOut = () => {
        const user = UserPool.getCurrentUser();
        if (user !== null) {
            user.signOut();
            console.log('User has been successfully signed out');
        } else {
            console.log('No user is currently signed in');
        }
    };

    return (
        <div className="logout-container">
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
};

export default Logout;