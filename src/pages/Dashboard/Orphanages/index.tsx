import React, { useEffect, useState } from "react";
import { FiArrowRightCircle, FiPlus, FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import api from "../../../services/Api";
import ToggleMenu from "../ToggleMenu";
import Skeleton from "react-loading-skeleton";
import "./styles.css";
import "reactjs-popup/dist/index.css";
import { toast, ToastContainer } from "react-toastify";
import { setTimeout } from "timers";
import themeContext from "../../../userTheme";

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    images: {
        id: number;
        url: string;
    }[];
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
}

const OrphanagesDashboard = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useEffect(() => {
        api.get("/orphanages").then(({ data }) => {
            setOrphanages(data);
        });
    }, []);
    function handleOrphanageDelete(id: number) {
        console.log(id);
        const isSure = window.confirm("Tem certeza disso?");
        isSure &&
            api.delete(`/orphanages/${id}`).then(() => {
                toast.success("Excluído com sucesso", {
                    autoClose: 1500,
                });
                setTimeout(() => window.location.reload(), 1500);
            });
    }

    return (
        <themeContext.Consumer>
            {({ theme }) => (
                <>
                    <ToggleMenu title="Orfanatos" />
                    <div id="dashboard-orphanages" className={theme}>
                        <main>
                            <ToastContainer />
                            <span>
                                <small>
                                    Listando {orphanages.length} orfanatos
                                    cadastrados
                                </small>
                                <Link to="/orphanages/create">
                                    <FiPlus size={20} color="000" />
                                </Link>
                            </span>
                            <ul>
                                {orphanages.length <= 0 && (
                                    <>
                                        <li className="skeleton">
                                            <Skeleton count={3} />
                                        </li>
                                        <li className="skeleton">
                                            <Skeleton count={3} />
                                        </li>
                                        <li className="skeleton">
                                            <Skeleton count={3} />
                                        </li>
                                    </>
                                )}
                                {orphanages.map((orphanage) => (
                                    <li key={orphanage.id}>
                                        <img
                                            src={orphanage.images[0].url}
                                            alt={orphanage.name}
                                        />
                                        <h4>{orphanage.name}</h4>

                                        <Popup
                                            trigger={
                                                <span>
                                                    <FiArrowRightCircle
                                                        size={30}
                                                    />
                                                </span>
                                            }
                                            modal
                                            nested
                                        >
                                            {(close: any) => (
                                                <div
                                                    className={
                                                        theme == "dark"
                                                            ? "modal dark"
                                                            : "modal"
                                                    }
                                                >
                                                    <button
                                                        className="close"
                                                        onClick={close}
                                                    >
                                                        <FiX
                                                            size={24}
                                                            color={
                                                                theme === "dark"
                                                                    ? "FFF"
                                                                    : "000"
                                                            }
                                                        />
                                                    </button>
                                                    <div className="header">
                                                        {orphanage.name}
                                                    </div>
                                                    <div className="content">
                                                        <ul>
                                                            {/* <li>Id: {String(orphanage.about).substring(0, 100) + '...'}</li> */}
                                                            <li>
                                                                <strong>
                                                                    Id:{" "}
                                                                </strong>
                                                                <p>
                                                                    {
                                                                        orphanage.id
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    Nome:{" "}
                                                                </strong>
                                                                <p>
                                                                    {
                                                                        orphanage.name
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    Posição:{" "}
                                                                </strong>
                                                                <p>{`${orphanage.latitude},${orphanage.longitude}`}</p>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    Sobre:{" "}
                                                                </strong>
                                                                <p>
                                                                    {String(
                                                                        orphanage.about
                                                                    ).substring(
                                                                        0,
                                                                        100
                                                                    ) + "..."}
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    Instruções:{" "}
                                                                </strong>
                                                                <p>
                                                                    {
                                                                        orphanage.instructions
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    Funcionamento:{" "}
                                                                </strong>
                                                                <p>
                                                                    {
                                                                        orphanage.opening_hours
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    Abre aos
                                                                    fins de
                                                                    semana?{" "}
                                                                </strong>
                                                                <p>
                                                                    {orphanage.open_on_weekends
                                                                        ? "Sim"
                                                                        : "Não"}
                                                                </p>
                                                            </li>
                                                            <li id="images">
                                                                <strong>
                                                                    Images:{" "}
                                                                </strong>
                                                                {orphanage.images.map(
                                                                    (img) => (
                                                                        <img
                                                                            key={
                                                                                img.id
                                                                            }
                                                                            src={
                                                                                img.url
                                                                            }
                                                                            alt={
                                                                                orphanage.name
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="actions">
                                                        <button
                                                            className="button"
                                                            style={{
                                                                backgroundColor:
                                                                    "#e53e3e",
                                                            }}
                                                            onClick={() =>
                                                                handleOrphanageDelete(
                                                                    orphanage.id
                                                                )
                                                            }
                                                        >
                                                            Excluir
                                                        </button>

                                                        <button
                                                            className="button"
                                                            style={{
                                                                backgroundColor:
                                                                    "#48bb78",
                                                            }}
                                                            onClick={() =>
                                                                close()
                                                            }
                                                        >
                                                            Fechar
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </li>
                                ))}
                            </ul>
                        </main>
                    </div>
                </>
            )}
        </themeContext.Consumer>
    );
};
export default OrphanagesDashboard;
