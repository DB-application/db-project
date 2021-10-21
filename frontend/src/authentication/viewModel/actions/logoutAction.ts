import {declareAction} from "@reatom/core";
import {AuthenticationApi} from "../../../api/authenticationApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {goToUrl} from "../../../core/link/goToUrl";


const logoutAction = declareAction(
    (_, store) => {
        AuthenticationApi.logOut()
            .then((resp) => {
                goToUrl('/auth')
            })
            .catch(processStandardError)
    }
)

export {
    logoutAction,
}