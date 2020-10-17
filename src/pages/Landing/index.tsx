import React, { StyleHTMLAttributes } from "react";
import logoSvg from "../../assets/logo.svg";

import { FiArrowRight } from "react-icons/fi";
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
                    <strong>Cascavel</strong>
                    <span>Ceará</span>
                </div>
                <Popup
                    trigger={
                        <div className="enter-app" title="Visite orfanatos">
                            <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                        </div>
                    }
                    position={"top right"}
                    repositionOnResize
                    contentStyle={{
                        backgroundColor: "#0ec1cb",
                        border: "2px solid #ffffff0f",
                        boxShadow: "1px 1px 10px #0000003f",
                        borderRadius: "20px",
                        padding: "10px",
                    }}
                >
                    <div className="popup-menu">
                        <Link
                            to="/orphanages"
                            title="Visite orfanatos"
                            className="popup-menu-link"
                        >
                            <p>Orfanatos</p>
                            <MdChildCare size={20} color="#ffd666" />
                        </Link>
                        <Link
                            to="/admin"
                            title="Painel administrativo"
                            className="popup-menu-link"
                        >
                            <p>Dashboard</p>
                            <AiOutlineDashboard size={20} color="#86604f" />
                        </Link>
                    </div>
                </Popup>
            </div>
        </div>
    );
};
export default Landing;
