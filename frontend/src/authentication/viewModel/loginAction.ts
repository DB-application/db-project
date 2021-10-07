import {declareAction} from "@reatom/core";
import {AuthenticationApi} from "../../api/authenticationApi";
import {loginPageActions} from "./loginPageData";
import {toast} from "react-toastify";
import {processStandardError} from "../../core/error/processStandardError";

type LoginActionPayload = {
    login: string;
    password: string;
};

const loginAction = declareAction<LoginActionPayload>(
    async ({login, password}, store) => {
        AuthenticationApi.logIn(login, password)
            .then(resp => {
                toast.success('Вход произведен успешно')
            })
            .catch(processStandardError)
            .finally(() => store.dispatch(loginPageActions.setIsLoading(false)))
    }
)

export {
    loginAction,
}
export type {
    LoginActionPayload
}