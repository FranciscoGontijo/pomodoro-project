import React from "react";
import UserPool from "../../util/UserPool";
import { useDispatch } from "react-redux";
import { createUser } from "../../slices/userSlice";
import { resetLabelList } from "../../slices/labeltagslice";
import { resetStats } from "../../slices/statsslice";

import './login.css';

const Logout = () => {
    const dispatch = useDispatch()
    const handleLogOut = () => {
        const user = UserPool.getCurrentUser();
        if (user !== null) {
            user.signOut();
            dispatch(createUser(''));
            dispatch(resetLabelList());
            dispatch(resetStats());
            console.log('User has been successfully signed out');
        } else {
            console.log('No user is currently signed in');
        }
    };

    return (
        <div className="logout-container">
            <button className="logout-button" onClick={handleLogOut}>LOG OUT</button>
        </div>
    )
};

export default Logout;