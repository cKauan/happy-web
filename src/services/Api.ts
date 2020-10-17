import Axios from "axios";
const server = "https://happy-servidor.herokuapp.com";
const localHost = "http://localhost:5500";
const api = Axios.create({
    baseURL: server,
});

export default api;
