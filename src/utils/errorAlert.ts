import { toast } from 'react-toastify';
export default function alertError(msg: string) {
    toast.error(`${msg}`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
    });
}