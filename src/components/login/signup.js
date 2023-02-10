import React, { useState } from "react";
import UserPool from "./UserPool";

import "./signup.css"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            };
            console.log(data);
            //POST request to create a new user using email as unique identifier 
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
                    <button type="submit">Signup</button>
            </form>
        </div>
    )
};

export default Signup;