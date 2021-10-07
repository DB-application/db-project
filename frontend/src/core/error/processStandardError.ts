import {toast} from "react-toastify";

function processStandardError(error?: any) {
    toast.error('Упс, что-то пошло не так. Попробуйте еще раз')
}

export {
    processStandardError,
}