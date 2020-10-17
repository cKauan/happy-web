import React from "react";
import Sidebar from "../../components/Sidebar";
import kids from "../../assets/kids.svg";
import "./styles.css";
import { Link } from "react-router-dom";
import ThemeContext from "../../userTheme";

const notFound = () => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div id="page-not-found" className={theme}>
                    <Sidebar />
                    <main>
                        <div className="text">
                            <h1>404</h1>
                            <p>
                                Ops...
                                <br /> Parece que essa página não existe
                            </p>
                            <Link to="/">
                                <small>Voltar para home</small>
                            </Link>
                        </div>
                        <div className="image">
                            <img src={kids} alt="Crianças" />
                        </div>
                    </main>
                </div>
            )}
        </ThemeContext.Consumer>
    );
};
export default notFound;
