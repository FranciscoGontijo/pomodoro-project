import React from "react";

import './footer.css';

const Footer = () => {
    //maybe buy me a coffe
    return (
        <div className="footer-container">
            <p>Made by Francisco Gontijo</p>
            <nav className="social-nav">  
                <a href="https://www.linkedin.com/in/francisco-gontijo-5a469b239" target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://github.com/FranciscoGontijo" target="_blank">
                    <i className="fab fa-github"></i>
                </a>
            </nav>
        </div>
    )
};

export default Footer;