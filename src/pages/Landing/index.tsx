import React from "react";
import logoSvg from "../../assets/logo.svg";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./styles.css";
const Landing = () => {
   
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoSvg} alt="Happy" />
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <strong>Cascavel</strong>
                    <span>Ceará</span>
                </div>
                <Link
                    to="/orphanages"
                    className="enter-app"
                    title="Visite orfanatos"
                >
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>
            </div>
        </div>
    );
};

export default Landing;
