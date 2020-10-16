import Axios from "axios";
const ApiUrl = String(process.env.REACT_API_URL);
const api = Axios.create({
    baseURL: ApiUrl ? ApiUrl : "http://localhost:5500",
});

export default api;
