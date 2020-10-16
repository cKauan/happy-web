import Axios from "axios";
const api = Axios.create({
    baseURL: "https://happy-servidor.herokuapp.com",
});

export default api;
