import React, { useState } from "react";
import Routes from "./Routes";
import ThemeContext from "./userTheme";
import "./styles.css";
import "leaflet/dist/leaflet.css";

const App = () => {
    const localStorageTheme = String(localStorage.getItem("theme"));
    const [theme, setTheme] = useState<string>(localStorageTheme);
    const toggleTheme = () => {
        const newTheme = theme == "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Routes />
        </ThemeContext.Provider>
    );
};

export default App;
