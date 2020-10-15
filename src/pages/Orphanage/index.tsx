import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../../components/Sidebar";
import ThemeContext from "../../userTheme";
import MapIcon from "../../utils/mapIcon";
import Api from "../../services/Api";
import "./styles.css";

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
interface RouteParms {
    id: string;
}
const Orphanage = () => {
    const [orphanage, setOrphanage] = useState<Orphanage>();
    const [activeImage, setActiveImage] = useState<number>(0);
    const params = useParams<RouteParms>();
    useEffect(() => {
        Api.get(`/orphanages/${params.id}`).then(({ data }) => {
            setOrphanage(data);
        });
    }, [params.id]);

    function handleImageSelection(index: number) {
        setActiveImage(index);
    }
    if (!orphanage) {
        return <h1>Carregando</h1>;
    }

    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div id="page-orphanage" className={theme}>
                    <Sidebar />
                    <main>
                        <div className="orphanage-details">
                            <img
                                src={orphanage.images[activeImage].url}
                                alt={orphanage.name}
                            />

                            <div className="images">
                                {orphanage.images.map((image, index) => (
                                    <button
                                        className={
                                            index === activeImage
                                                ? "active"
                                                : ""
                                        }
                                        type="button"
                                        key={image.id}
                                        onClick={() =>
                                            handleImageSelection(index)
                                        }
                                    >
                                        <img
                                            src={image.url}
                                            alt={orphanage.name}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="orphanage-details-content">
                                <h1>{orphanage.name}</h1>
                                <p>{orphanage.about}</p>

                                <div className="map-container">
                                    <Map
                                        center={[
                                            orphanage.latitude,
                                            orphanage.longitude,
                                        ]}
                                        zoom={16}
                                        style={{ width: "100%", height: 280 }}
                                        dragging={false}
                                        touchZoom={false}
                                        scrollWheelZoom={false}
                                        doubleClickZoom={false}
                                    >
                                        <TileLayer
                                            url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
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

                                    <footer>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={`https://www.google.com/maps/dir/?api1=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                                        >
                                            Ver rotas no Google Maps
                                        </a>
                                    </footer>
                                </div>

                                <hr />

                                <h2>Instruções para visita</h2>
                                <p>{orphanage.instructions}</p>

                                <div className="open-details">
                                    <div className="hour">
                                        <FiClock size={32} color="#15B6D6" />
                                        Segunda à Sexta <br />
                                        {orphanage.opening_hours}
                                    </div>
                                    {orphanage.open_on_weekends ? (
                                        <div className="open-on-weekends">
                                            <FiInfo size={32} color="#39CC83" />
                                            Atendemos <br />
                                            fim de semana
                                        </div>
                                    ) : (
                                        <div className="open-on-weekends dont-open">
                                            <FiInfo size={32} color="#FF669D" />
                                            Não atendemos <br />
                                            fim de semana
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className="contact-button"
                                >
                                    <FaWhatsapp size={22} color="#39CC83" />
                                    Entrar em contato
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </ThemeContext.Consumer>
    );
};

export default Orphanage;
