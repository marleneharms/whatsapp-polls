import { toast } from "react-toastify";


const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};


const notifyError = (message) => toast.error(message, toastConfig);

const notifySuccess = (message) => toast.success(message, toastConfig);

const notifyWarning = (message) => toast.warn(message, toastConfig);

const notifySuccessWithCallback = (message, callback) => toast.success(message, {
    ...toastConfig,
    autoClose: 500,
    onClose: callback,
});


export { notifyError, notifySuccess, notifyWarning, notifySuccessWithCallback };

