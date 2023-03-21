import React, { useState } from "react";

import LoginPage from "../login/loginpage";

import logosrc from '../../assets/images/logo.png';

const TopNavBar = ({ openNavBar }) => {

    return (
        <div className="top-navbar">
            <button type="button" className="top-navbar-button" onClick={openNavBar}><i className="fa-solid fa-bars"></i></button>
            <div className="top-navbar-logo-container">
                <img src={logosrc} alt="logo" className="logo" />
                <div className="logo-title-container">
                    <h2>Pomodoro</h2><span>App</span>
                </div>
            </div>
            <LoginPage/>
        </div>
    )
};

export default TopNavBar;



//What I want for this to do is. You have the button instead of the sidebar when the screen size are small.
//When the button is clicked, the navbar will take place at the entire screen.
//When clicked where to go, go back to the button and hide the navbar.
