import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { ToastContainer, toast } from "react-toastify";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import ThemeContext from "../../userTheme";
import MapIcon from "../../utils/mapIcon";
import "./styles.css";
import api from "../../services/Api";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface Position {
    latitude: number;
    longitude: number;
}
const CreateOrphanage = () => {
    const history = useHistory();
    const [position, setPosition] = useState<Position>({
        latitude: 0,
        longitude: 0,
    });
    const [name, setName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [opening_hours, setOpeningHours] = useState<string>("");
    const [open_on_weekends, setOpeningOnWeekends] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        setPosition({ latitude: lat, longitude: lng });
    }
    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        const {
            target: { files },
        } = event;
        if (!files) return;
        const selectedImages = Array.from(files);
        setImages(selectedImages);
        const selectedImagesPreview = selectedImages.map((image) => {
            return URL.createObjectURL(image);
        });
        setPreview(selectedImagesPreview);
    }
    function alertError(msg: string) {
        toast.error(`${msg}`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
        });
    }
    function useValidation() {
        const { latitude, longitude } = position;
        
        if (latitude === 0) return alertError("Selecione um lugar no mapa");
        if (images.length <= 0) return alertError("Selecione 1 ou mais imagens");
        if (name.length <= 0) return alertError("Você precisa colocar um nome válido ");
        if (about.length <= 0 || about.length >= 300) return alertError("Preencha o campo Sobre corretamente");
        if (instructions.length <= 0) return alertError("Insira as instruções para visitantes"); 
        if (opening_hours.length <= 0) return alertError("Insira o horário de funcionamento");
        return true;
        
    }
    async function handleSubmitEvent(event: FormEvent) {
        const { latitude, longitude } = position;
        event.preventDefault();
        const isValid = useValidation();
        if (!isValid) return;
        const multipartForm = new FormData();
        multipartForm.append("name", name);
        multipartForm.append("about", about);
        multipartForm.append("latitude", String(latitude));
        multipartForm.append("longitude", String(longitude));
        multipartForm.append("instructions", instructions);
        multipartForm.append("open_on_weekends", String(open_on_weekends));
        multipartForm.append("opening_hours", opening_hours);
        images.forEach((image) => multipartForm.append("images", image));

        await api.post("orphanages", multipartForm);
        toast.success("✔ Cadastro com sucesso!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
        });
        setTimeout(() => history.push("/orphanages"), 3000);
    }

    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div id="page-create-orphanage" className={theme}>
                    <Sidebar />
                    <ToastContainer />
                    <main>
                        <form
                            className="create-orphanage-form"
                            onSubmit={(event) => handleSubmitEvent(event)}
                        >
                            <fieldset>
                                <legend>Dados</legend>

                                <Map
                                    center={[-27.2092052, -49.6401092]}
                                    style={{ width: "100%", height: 280 }}
                                    zoom={15}
                                    onClick={handleMapClick}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        url={`https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                    />
                                    {position.latitude !== 0 && (
                                        <Marker
                                            interactive={false}
                                            icon={MapIcon}
                                            position={[
                                                position.latitude,
                                                position.longitude,
                                            ]}
                                        />
                                    )}
                                </Map>

                                <div className="input-block">
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        id="name"
                                        value={name}
                                        onChange={({ target: { value } }) =>
                                            setName(value)
                                        }
                                    />
                                </div>

                                <div className="input-block">
                                    <label htmlFor="about">
                                        Sobre{" "}
                                        <span>Máximo de 300 caracteres</span>
                                    </label>
                                    <textarea
                                        id="name"
                                        maxLength={300}
                                        value={about}
                                        onChange={({ target: { value } }) =>
                                            setAbout(value)
                                        }
                                    />
                                </div>

                                <div className="input-block">
                                    <label htmlFor="images">Fotos</label>

                                    <div className="images-container">
                                        {preview.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={name}
                                            />
                                        ))}
                                        <label
                                            className="new-image"
                                            htmlFor="image[]"
                                        >
                                            <FiPlus size={24} color="#15b6d6" />
                                        </label>
                                    </div>
                                    <input
                                        type="file"
                                        id="image[]"
                                        multiple
                                        onChange={handleSelectImages}
                                    />
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Visitação</legend>

                                <div className="input-block">
                                    <label htmlFor="instructions">
                                        Instruções
                                    </label>
                                    <textarea
                                        id="instructions"
                                        value={instructions}
                                        onChange={({ target: { value } }) =>
                                            setInstructions(value)
                                        }
                                    />
                                </div>

                                <div className="input-block">
                                    <label htmlFor="opening_hours">
                                        Horário de Funcionamento
                                    </label>
                                    <input
                                        id="opening_hours"
                                        value={opening_hours}
                                        onChange={({ target: { value } }) =>
                                            setOpeningHours(value)
                                        }
                                    />
                                </div>

                                <div className="input-block">
                                    <label htmlFor="open_on_weekends">
                                        Atende fim de semana
                                    </label>

                                    <div className="button-select">
                                        <button
                                            type="button"
                                            className={
                                                open_on_weekends ? "active" : ""
                                            }
                                            onClick={() =>
                                                setOpeningOnWeekends(true)
                                            }
                                        >
                                            Sim
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                !open_on_weekends
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setOpeningOnWeekends(false)
                                            }
                                        >
                                            Não
                                        </button>
                                    </div>
                                </div>
                            </fieldset>

                            <button className="confirm-button" type="submit">
                                Confirmar
                            </button>
                        </form>
                    </main>
                </div>
            )}
        </ThemeContext.Consumer>
    );
};

export default CreateOrphanage;
// return `https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`;
