import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectTimer } from "../../slices/timerslice";

import logosrc from '../../assets/images/logo.png';
import "./sidebar.css"

const SideBar = () => {
    const { status } = useSelector(selectTimer);
    return (
        <nav className="sidebar-nav">
            <div className="logo-container">
                <img src={logosrc} alt="logo" className="logo" />
                <div className="logo-title-container">
                    <h2>Pomodoro</h2><span>App</span>
                </div>
            </div>
            <ul>
                <li className="functioning-nav-link">
                    <Link className="link" to="/timer">
                        <i class="fa-regular fa-clock"></i>Timer
                    </Link>
                </li>
                <li
                    className={status === "ON_HOLD" ? 'functioning-nav-link link' : 'link disabled-nav-link'}
                    title={status !== "ON_HOLD" && 'Reset timer to access Stats'}>
                    <Link
                        style={status !== "ON_HOLD" ? { pointerEvents: "none" } : null}
                        className="link"
                        to="/stats">
                        <i class="fa-solid fa-chart-column"></i>Stats
                    </Link>
                </li>
                <li
                    className={status === "ON_HOLD" ? 'functioning-nav-link link' : 'link disabled-nav-link'}
                    title={status !== "ON_HOLD" && 'Reset timer to access Settings'}>
                    <Link
                        style={status !== "ON_HOLD" ? { pointerEvents: "none" } : null}
                        className="link"
                        to="/settings">
                        <i class="fa-solid fa-gear" ></i>Settings
                    </Link>
                </li>
            </ul>
        </nav>
    )
};

export default SideBar;