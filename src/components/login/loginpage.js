import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

import "./login.css";

import Login from "./login";
import Signup from "./signup";
import Logout from "./logout";
import ForgotPasswordForm from "./forgotpassword";

const LoginPage = () => {
    const { userEmail } = useSelector(selectUser);
    const [display, setDisplay] = useState('closed');

    //have to handle login and close the login page
    //have to change from log out button when logges out
    //have to log in directly after sign up and close the login page


    const handleClick = (e) => {
        e.preventDefault();

        if (display === 'closed') {
            setDisplay('login');
        } else {
            setDisplay('closed');
        }
    };

    const handleChange = (e) => {
        e.preventDefault();

        if (display === 'login') {
            setDisplay('signin');
        }
        if (display === 'signin') {
            setDisplay('login');
        }
    };

    const openForgotPasswordForm = () => {
        setDisplay('forgotPassword')
    };

    return (
        <div className='login-page-container'>
            {(display === 'closed' && userEmail === '') &&
                <button className="initial-login-button" onClick={handleClick}>
                    <i className="fa-regular fa-user"></i> LOG IN
                </button>}
            {(display === 'closed' && userEmail !== '') && <Logout />}
            {display === 'login' &&
                <Login
                    handleChange={handleChange}
                    handleClick={handleClick}
                    openForgotPasswordForm={openForgotPasswordForm} />
            }
            {display === 'signin' &&
                <Signup
                    handleChange={handleChange}
                    handleClick={handleClick} />
            }
            {display === 'forgotPassword' &&
                <ForgotPasswordForm
                    handleClick={handleClick} />}
        </div>
    )
};

export default LoginPage;