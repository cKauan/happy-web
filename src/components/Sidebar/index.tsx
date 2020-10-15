import React from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";
// import mapMarkerImg from "../../assets/map-marker.svg";
// svg import was not working on vercel deployment
import ThemeContext from "../../userTheme";
import "./styles.css";

const Sidebar = () => {
    const { goBack } = useHistory();
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <aside className={`app-sidebar ${theme}`}>
                    <img src="https://happy-web-gamma.vercel.app/map-marker.71889b59.svg" alt="Happy" />
                    <footer>
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                        <span onClick={toggleTheme}>
                            {theme == "light" ? (
                                <FiSun size={22} color="FFFF00" />
                            ) : (
                                <FiMoon size={22} color="FFF" />
                            )}
                        </span>
                    </footer>
                </aside>
            )}
        </ThemeContext.Consumer>
    );
};
export default Sidebar;
