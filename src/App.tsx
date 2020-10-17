import React, { useState } from "react";
import Routes from "./Routes";
import userAuth from "./userAuth";
import ThemeContext from "./userTheme";

import "leaflet/dist/leaflet.css";
import "./styles.css";

const App = () => {
    const localStorageTheme = localStorage.getItem("theme") || "light";
    const localStorageLogin = Boolean(localStorage.getItem("logged"));

    const [theme, setTheme] = useState<string>(localStorageTheme);
    const [isLogged, setIsLogged] = useState<boolean>(localStorageLogin);

    const toggleTheme = () => {
        const newTheme = theme == "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const setLogged = () => {
        setIsLogged(true);
        localStorage.setItem("logged", "true");
    };

    return (
        <userAuth.Provider value={{ isLogged, setLogged }}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <Routes />
            </ThemeContext.Provider>
        </userAuth.Provider>
    );
};

export default App;
