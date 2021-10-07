import {declareAction} from "@reatom/core";
import {AuthenticationApi} from "../../api/authenticationApi";
import {initUserDataAction} from "./initUser";
import {loginPageActions} from "./loginPageData";

type LoginActionPayload = {
    login: string;
    password: string;
};

const loginAction = declareAction<LoginActionPayload>(
    async ({login, password}, store) => {
        AuthenticationApi.logIn(login, password)
            .then((resp) => {
                if (resp.status === 200) {
                    setTimeout(() => {
                        store.dispatch(initUserDataAction());
                    }, 100);
                }
            })
            .catch((err) => {
                // ошибка
            })
            .finally(() => {
                store.dispatch(loginPageActions.setIsLoading(false))
            })
    }
)

export {
    loginAction,
}
export type {
    LoginActionPayload
}