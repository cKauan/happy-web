import React from "react";
import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaInbox,
} from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";
import astronaut from "../../../assets/astronaut-svg.svg";
import "./styles.css";
import themeContext from "../../../userTheme";

const About = () => {
    return (
        <themeContext.Consumer>
            {({ theme }) => (
                <>
                    <ToggleMenu title="Sobre" />
                    <div id="dashboard-page-about" className={theme}>
                        <main>
                            <section>
                                <span>
                                    <h2>
                                        Oi, me chamo <strong>Carlos</strong>
                                    </h2>
                                    <small>
                                        Vou colocar minhas redes sociais aqui,
                                        tá?
                                    </small>
                                </span>
                                <ul>
                                    <li>
                                        <FaGithub size={26} color="000" />
                                        <a
                                            href="https://www.github.com/cKauan/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Github
                                        </a>
                                    </li>

                                    <li>
                                        <img
                                            src="https://rocketseat.com.br/favicon.ico"
                                            alt="Rocketseat"
                                            height="26"
                                        />
                                        <a
                                            href="https://app.rocketseat.com/me/ckauan/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            RocketSeat
                                        </a>
                                    </li>

                                    <li>
                                        <FaLinkedin size={26} color="2867B2" />
                                        <a
                                            href="https://linkedin.com/in/carlos-kauãn-moreira-de-sousa-6325371a6/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Linkedin
                                        </a>
                                    </li>

                                    <li>
                                        <FaTwitter size={26} color="1DA1F2" />
                                        <a
                                            href="https://twitter.com/carlaodamassaa"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                        </a>
                                    </li>

                                    <li>
                                        <FaInstagram size={26} color="000" />
                                        <a
                                            href="https://www.instagram.com/carloskauan_/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </li>

                                    <li>
                                        <FaInbox size={26} color="F56040" />
                                        <a
                                            href="mailto:carloskauanmoreiradesousa@gmail.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Email
                                        </a>
                                    </li>
                                </ul>
                                <div id="astronaut-container">
                                    <img
                                        src="https://svgur.com/i/Qeh.svg"
                                        alt="Astronaut"
                                        height="300"
                                    />
                                </div>
                            </section>
                            <div className="image-container">
                                <img
                                    src="https://avatars2.githubusercontent.com/u/62940724?v=4"
                                    alt=""
                                />
                            </div>
                        </main>
                    </div>
                </>
            )}
        </themeContext.Consumer>
    );
};
export default About;
