import {declareAction} from "@reatom/core";
import { toast } from "react-toastify";
import {AuthenticationApi} from "../../../api/authenticationApi";
import {loginPageActions} from "../loginPageData";
import {processStandardError} from "../../../core/error/processStandardError";


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
            .catch(processStandardError)
            .finally(() => {
                store.dispatch(loginPageActions.setIsLoading(false))
            })
    }
)

export {
    registrationAction,
}