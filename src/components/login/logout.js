import React from "react";
import UserPool from "../../util/UserPool";
import { useDispatch } from "react-redux";
import { createUser } from "../../slices/userSlice";

import './login.css'

const Logout = () => {
    const dispatch = useDispatch()
    const handleLogOut = () => {
        const user = UserPool.getCurrentUser();
        if (user !== null) {
            user.signOut();
            dispatch(createUser(''));
            // refresh page
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