import {declareAction} from "@reatom/core";
import {AuthenticationApi} from "../../../api/authenticationApi";
import {loginPageActions} from "../loginPageData";
import {toast} from "react-toastify";
import {processStandardError} from "../../../core/error/processStandardError";
import {goToUrl} from "../../../core/link/goToUrl";
import {Router} from "../../../core/router/router";
import {LocalStorage, STORAGE_KEYS} from "../../../core/localStorage/localStorage";
import {HttpStatus} from "../../../core/http/HttpStatus";

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
                const redirectToUrl: string = LocalStorage.getValue(STORAGE_KEYS.REDIRECT_FROM) || Router.Workspace.url()
                setTimeout(() => goToUrl(redirectToUrl), 1000)
            })
            .catch(err => {
                if (err.status && err.status === HttpStatus.UNAUTHORIZED) {
                    store.dispatch(loginPageActions.setLoginError('unknown_login'))
                    store.dispatch(loginPageActions.setPasswordError('wrong_password'))
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