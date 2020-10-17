import { createContext } from "react";
const isLogged = createContext({ isLogged: false, setLogged: () => {} });

export default isLogged;
