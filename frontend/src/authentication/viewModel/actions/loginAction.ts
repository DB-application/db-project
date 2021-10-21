import {declareAction} from "@reatom/core";
import {AuthenticationApi} from "../../../api/authenticationApi";
import {loginPageActions} from "../loginPageData";
import {toast} from "react-toastify";
import {processStandardError} from "../../../core/error/processStandardError";
import {goToUrl} from "../../../core/link/goToUrl";

type LoginActionPayload = {
    login: string;
    password: string;
};

const loginAction = declareAction<LoginActionPayload>(
    async ({login, password}, store) => {
        AuthenticationApi.logIn(login, password)
            .then(resp => {
                toast.success('Вход произведен успешно')
                store.dispatch(loginPageActions.setIsLoading(false))
                setTimeout(() => goToUrl('/workspace'), 1000)
            })
            .catch(err => {
                if (err.status && err.status === 401) {
                    toast.error('Введен неверный логин или пароль')
                    return
                }
                store.dispatch(loginPageActions.setIsLoading(false))
                processStandardError()
            })
            .finally(() => store.dispatch(loginPageActions.setIsLoading(false)))
    }
)

export {
    loginAction,
}
export type {
    LoginActionPayload
}