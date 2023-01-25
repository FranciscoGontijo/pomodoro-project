import "./sidebar.css"
import { Link } from "react-router-dom"

    
const SideBar = () => {
    return (
        <nav>
            <img src="#" alt="logo" />  
            <ul>
                <li><Link to="/timer"><i class="fa-regular fa-clock"></i>Timer</Link></li>
                <li><Link to="/stats"><i class="fa-solid fa-chart-column"></i>Stats</Link></li>
                <li><Link to="/settings"><i class="fa-solid fa-gear"></i>Settings</Link></li>
                <li><i class="fa-solid fa-moon"></i>Dark Mode</li>
            </ul>
        </nav>
    )
};

export default SideBar;