import React, { useState, useEffect } from "react";
import axios from 'axios';


import "./login/login.css"

const TestServer = () => {
    const [result, setResult] = useState({hello: "Loading..."});

    useEffect(() => {
        const fetchData = async () => {
            axios.get('/post')
        .then(res => setResult(res.data))
        .catch(err => console.error(err));
        }
        fetchData();
    }, []);

    //result is not beeing rendered
    //not sure if it is beein fetched
    //how to test???


    return (
        <div className="tester">
            <h1>Test:</h1>
            <p>{result.hello}</p>
        </div>
    )
};

export default TestServer;