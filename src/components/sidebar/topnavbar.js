import React from "react";
import { Link } from "react-router-dom"

import LoginPage from "../login/loginpage";

import logosrc from '../../assets/images/logo.png';

const TopNavBar = ({ openNavBar }) => {

    return (
        <div className="top-navbar">
            <button type="button" className="top-navbar-button" onClick={openNavBar}><i className="fa-solid fa-bars"></i></button>
            <Link style={{ textDecoration: "none"}} className="link" to="/" >
                <div className="top-navbar-logo-container">
                    <img src={logosrc} alt="logo" className="logo" />
                    <div className="logo-title-container">
                        <h2>Pomodoro</h2><span>App</span>
                    </div>
                </div>
            </Link>
            <LoginPage />
        </div>
    )
};

export default TopNavBar;
