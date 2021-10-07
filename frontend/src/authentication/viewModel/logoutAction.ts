import {declareAction} from "@reatom/core";
import { AuthenticationApi } from "../../api/authenticationApi";
import {userActions} from "./userAtom";
import {processStandardError} from "../../core/error/processStandardError";


const logoutAction = declareAction(
    (payload, store) => {
        AuthenticationApi.logOut()
            .then((resp) => {
                store.dispatch(userActions.setUserUnauthorized())
            })
            .catch(processStandardError)
    }
)

export {
    logoutAction,
}