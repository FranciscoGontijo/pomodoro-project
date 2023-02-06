import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectTimer } from "../timer/timerslice";

import "./sidebar.css"

    
const SideBar = () => {
    const { status } = useSelector(selectTimer);
    return (
        <nav className="sidebar-nav">
            <img src="#" alt="logo" />  
            <ul>
                <li><Link to="/timer"><i class="fa-regular fa-clock"></i>Timer</Link></li>
                <li><Link
                    style={status !== "ON_HOLD" ? {pointerEvents: "none"} : null}
                    className={status === "ON_HOLD" ? 'functioning' : 'disabled'} 
                    to="/stats"><i class="fa-solid fa-chart-column"></i>Stats</Link></li>
                <li><Link 
                    style={status !== "ON_HOLD" ? {pointerEvents: "none"} : null}
                    className={status === "ON_HOLD" ? 'functioning' : 'disabled'} 
                    to="/settings"><i class="fa-solid fa-gear" ></i>Settings</Link></li>  
                <li><i class="fa-solid fa-moon"></i>Dark Mode</li>
            </ul>
        </nav>
    )
};

export default SideBar;