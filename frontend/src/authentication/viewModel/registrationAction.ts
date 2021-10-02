import {declareAction} from "@reatom/core";
import {AuthenticationApi} from "../../api/authenticationApi";


type RegistrationActionPayload = {
    email: string;
    nickname: string,
    password: string;
};

const registrationAction = declareAction<RegistrationActionPayload>(
    async ({email, password, nickname}, store) => {
        AuthenticationApi.registration(email, password, nickname)
            .then((resp) => {

            })
            .catch((err) => {
                // ошибка
            });
    }
)

export {
    registrationAction,
}