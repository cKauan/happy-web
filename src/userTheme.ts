import { createContext } from "react";
const toggleDefaultTheme = createContext({
    theme: "light",
    toggleTheme: () => {},
});

export default toggleDefaultTheme;
