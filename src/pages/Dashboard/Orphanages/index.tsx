import React, { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiArrowRightCircle,
    FiEdit3,
    FiPlus,
    FiTrash,
    FiX,
} from "react-icons/fi";
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
import { TileLayer, Marker, Map } from "react-leaflet";
import MapIcon from "../../../utils/mapIcon";
import deleteImage from "../../../assets/deleteImage.png";

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
    const [deleteOrphanage, setDeleteOrphanage] = useState<number>(0);
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
        return;
    }
    if (deleteOrphanage)
        return (
            <div id="dashboard-delete">
                <ToastContainer />
                <main>
                    <section>
                        <button
                            type="button"
                            onClick={() =>
                                handleOrphanageDelete(deleteOrphanage)
                            }
                        >
                            <h1>Excluir!</h1>
                        </button>
                        <p>
                            Você tem certeza que quer
                            <br /> excluir Orf. Esperança?
                        </p>
                        <button
                            type="button"
                            onClick={() => setDeleteOrphanage(0)}
                        >
                            Voltar para o mapa
                        </button>
                    </section>
                    <img src={deleteImage} alt="" />
                </main>
            </div>
        );
    return (
        <themeContext.Consumer>
            {({ theme }) => (
                <>
                    <ToggleMenu title="Orfanatos" />
                    <div id="dashboard-orphanages" className={theme}>
                        {orphanages.length <= 0 && (
                            <>
                                <div className="orphanages">
                                    <div className="orphanage-map">
                                        <Skeleton
                                            count={5}
                                            className="skeleton"
                                        />
                                    </div>
                                    <div className="orphanage-actions">
                                        <h3>Carregando...</h3>
                                        <div className="actions">
                                            <button
                                                type="button"
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                <FiEdit3
                                                    size={26}
                                                    color="15C3D6"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                <FiTrash
                                                    size={26}
                                                    color="15C3D6"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="orphanages">
                                    <div className="orphanage-map">
                                        <Skeleton
                                            count={5}
                                            className="skeleton"
                                        />
                                    </div>
                                    <div className="orphanage-actions">
                                        <h3>Carregando...</h3>
                                        <div className="actions">
                                            <button
                                                type="button"
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                <FiEdit3
                                                    size={26}
                                                    color="15C3D6"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                <FiTrash
                                                    size={26}
                                                    color="15C3D6"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {orphanages.map((orphanage) => (
                            <div key={orphanage.id} className="orphanages">
                                <div className="orphanage-map">
                                    <Map
                                        center={[
                                            orphanage.latitude,
                                            orphanage.longitude,
                                        ]}
                                        zoom={16}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "20px",
                                            zIndex: 1,
                                        }}
                                        dragging={false}
                                        touchZoom={false}
                                        scrollWheelZoom={false}
                                        doubleClickZoom={false}
                                        zoomControl={false}
                                    >
                                        <TileLayer
                                            url={`https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                        />
                                        <Marker
                                            interactive={false}
                                            icon={MapIcon}
                                            position={[
                                                orphanage.latitude,
                                                orphanage.longitude,
                                            ]}
                                        />
                                    </Map>
                                </div>
                                <div className="orphanage-actions">
                                    <h3>{orphanage.name}</h3>
                                    <div className="actions">
                                        <Link to="/">
                                            <FiEdit3 size={26} color="15C3D6" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDeleteOrphanage(orphanage.id)
                                            }
                                        >
                                            <FiTrash size={26} color="15C3D6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </themeContext.Consumer>
    );
};
export default OrphanagesDashboard;

/*
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
*/
