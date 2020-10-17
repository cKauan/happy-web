import React, { useState } from "react";
import ToggleMenu from "./ToggleMenu";
import websiteImage from "../../assets/website-screenshot.png";
import orphanageScreenshot from "../../assets/orphanages-screenshot.png";
import aboutScreenshot from "../../assets/about-screenshot.png";
import "./styles.css";
import { Link } from "react-router-dom";
import themeContext from "../../userTheme";

const Dashboard = () => {
    return (
        <themeContext.Consumer>
            {({ theme }) => (
                <div id="dashboard" className={theme}>
                    <ToggleMenu title="Administração" />
                    <main>
                        <section>
                            <Link to="/" id="website" className="page">
                                <h2>Visitar site</h2>
                                <img src={websiteImage} alt="Happy" />
                            </Link>
                            <Link
                                to="/admin/orphanages"
                                id="orphanages"
                                className="page"
                            >
                                <h2>Gerenciar orfanatos</h2>
                                <img
                                    src={orphanageScreenshot}
                                    alt="Orfanatos"
                                />
                            </Link>
                            <Link to="/admin/about" id="about" className="page">
                                <h2>Sobre o projeto</h2>
                                <img src={aboutScreenshot} alt="Sobre" />
                            </Link>
                        </section>
                        
                    </main>
                </div>
            )}
        </themeContext.Consumer>
    );
};

export default Dashboard;
