import React from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import userAuth from "../../userAuth";
import cuteAstronaut from "../../assets/cute-astronaut.svg";
import astronautRocket from "../../assets/astronaut-rocket.png";
import "./styles.css";
import { FiHome } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
const Auth = () => {
    const history = useHistory();

    const onFailure = () => {
        return history.push("/auth");
    };
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <userAuth.Consumer>
            {({ isLogged, setLogged }) => {
                return (
                    <div id="dashboard-auth">
                        <aside>
                            <img src={cuteAstronaut} alt="" />
                        </aside>
                        <main>
                            <section>
                                <div className="text">
                                    <h1>Olá estranho 🖖</h1>
                                    <small>
                                        Você precisa estar logado para acessar
                                        essa seção do site
                                    </small>
                                </div>
                                <img
                                    src={astronautRocket}
                                    alt="Astronauta"
                                    height="200"
                                />
                                <div className="actions">
                                <GoogleLogin
                                        render={(renderProps) => (
                                            <button
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                            >
                                                Entrar com o Google
                                                <FcGoogle size={22} />
                                            </button>
                                        )}
                                        clientId={String(clientId)}
                                        buttonText="Login"
                                        onSuccess={setLogged}
                                        onFailure={onFailure}
                                        cookiePolicy={"single_host_origin"}
                                        isSignedIn={true}
                                    />
                                    <Link to="/">
                                        Voltar para a Home
                                        <FiHome size={22} />
                                    </Link>
                                    
                                    <small>Não guardamos nenhuma informação sua</small>
                                </div>
                            </section>
                        </main>
                    </div>
                );
            }}
        </userAuth.Consumer>
    );
};

export default Auth;
