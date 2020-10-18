import React, { StyleHTMLAttributes } from "react";
import logoSvg from "../../assets/logo.svg";

import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdChildCare } from "react-icons/md";
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
                    <FiMapPin size={22}/>
                    <strong>Cascavel - </strong>
                    <span>Ceará</span>
                </div>
                <Link to="/admin" className="restrict-access">
                    <h3>Acesso restrito</h3>
                </Link>
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
