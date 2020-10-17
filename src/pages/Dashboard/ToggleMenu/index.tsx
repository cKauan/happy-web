import React, { useState } from "react";
import {
    FiX,
    FiAlignCenter,
    FiHome,
    FiStar,
    FiUsers,
    FiAlertCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import themeContext from "../../../userTheme";
import "./styles.css";

interface Props {
    title: string;
}

const ToggleMenu = ({ title }: Props) => {
    const links = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: <FiHome size={25} />,
        },
        {
            name: "Orfanatos",
            path: "/admin/orphanages",
            icon: <FiUsers size={25} />,
        },
        {
            name: "Sobre",
            path: "/admin/about",
            icon: <FiAlertCircle size={25} />,
        },
    ];
    const [sidebar, setSidebar] = useState<boolean>(false);
    const showSidebar = () => setSidebar(!sidebar);
    
    return (
        <themeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <>
                    <div id="dashboard-toggle-menu" className={theme}>
                        <header className="navbar">
                            <span className="toggle-menu">
                                <FiAlignCenter
                                    size={40}
                                    onClick={showSidebar}
                                    color="d5e0e6"
                                />
                            </span>
                            <h1 className="page-title">{title}</h1>
                            <DarkModeToggle
                                size={80}
                                onChange={toggleTheme}
                                checked={theme === "dark"}
                            />
                        </header>
                        <nav
                            className={sidebar ? "nav-menu active" : "nav-menu"}
                        >
                            <ul
                                className="nav-menu-items"
                                onClick={showSidebar}
                            >
                                <li className="navbar-toggle">
                                    <span className="toggle-menu">
                                        <FiX
                                            size={40}
                                            onClick={showSidebar}
                                            color="FFF"
                                        />
                                    </span>
                                </li>
                                {links.map((link, index) => (
                                    <li key={index} className="nav-text">
                                        <Link to={link.path}>
                                            {link.icon}
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </themeContext.Consumer>
    );
};

export default ToggleMenu;
