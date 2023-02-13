import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserPool from "./UserPool";
import { selectUser } from "./userSlice";

import "./login.css";

import Login from "./login";
import Signup from "./signup";
import Logout from "./logout";

const LoginPage = () => {
    const { userEmail } = useSelector(selectUser);
    const [choose, setChoose] = useState('closed');

    //have to handle login and close the login page
    //have to change from log out button when logges out
    //have to log in directly after sign up and close the login page
    const otherName = () => {

    }

    const handleClick = (e) => {
        e.preventDefault();

        if (choose === 'closed') {
            setChoose('login');
        } else {
            setChoose('closed');
        }
    };

    const handleChange = (e) => {
        e.preventDefault();

        if (choose === 'login') {
            setChoose('signin');
        }
        if (choose === 'signin') {
            setChoose('login');
        }
    };

    return (
        <div className='login-page-container'>
            {(choose === 'closed' && userEmail === '') && <button onClick={handleClick}>Login</button>}
            {(choose === 'closed' && userEmail !== '') && <Logout />}
            {choose === 'login' &&
                <Login
                    handleChange={handleChange}
                    handleClick={handleClick} />
            }
            {choose === 'signin' &&
                <Signup
                    handleChange={handleChange}
                    handleClick={handleClick} />
            }
        </div>
    )
};

export default LoginPage;