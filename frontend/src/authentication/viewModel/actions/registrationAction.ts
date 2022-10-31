import {declareAction} from "@reatom/core";
import {toast} from "react-toastify";
import {AuthenticationApi} from "../../../api/authenticationApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {HttpStatus} from "../../../core/http/HttpStatus";
import {registrationPageAction} from "../registrationPageData";


type RegistrationActionPayload = {
    email: string;
    nickname: string,
    password: string;
};

const registrationAction = declareAction<RegistrationActionPayload>(
    async ({email, password, nickname}, store) => {
        AuthenticationApi.registration(email, password, nickname)
            .then((resp) => {
                toast.success('Регистрация прошла успешно')
                setTimeout(() => window.location.reload(), 1000)
            })
            .catch(err => {
                if (err.status && err.status === HttpStatus.UNAUTHORIZED) {
                    store.dispatch(registrationPageAction.setEmailError('taken'))
                    store.dispatch(registrationPageAction.setNicknameError('taken'))
                    return
                }
                processStandardError()
            })
            .finally(() => {
                store.dispatch(registrationPageAction.setIsLoading(false))
            })
    }
)

export {
    registrationAction,
}