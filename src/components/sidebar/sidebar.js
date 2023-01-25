import "./sidebar.css"

const SideBar = () => {
    return (
        <nav>
            <img src="#" alt="logo" />  
            <ul>
                <li><i class="fa-regular fa-clock"></i>Timer</li>
                <li><i class="fa-solid fa-chart-column"></i>Stats</li>
                <li><i class="fa-solid fa-gear"></i>Settings</li>
                <li><i class="fa-solid fa-moon"></i>Dark Mode</li>
            </ul>
        </nav>
    )
};

export default SideBar;