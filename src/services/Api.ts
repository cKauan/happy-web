import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://localhost:5500',
});

export default api;
