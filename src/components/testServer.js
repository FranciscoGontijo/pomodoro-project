import React, { useState, useEffect } from "react";

import "./login/login.css"

const TestServer = () => {
    const [result, setResult] = useState({hello: "Loading..."});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/post');
            console.log(response);
            const newData = await response.json();
            console.log(newData);
            setResult(newData);

            //if (response. isJson()) return response
        };
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