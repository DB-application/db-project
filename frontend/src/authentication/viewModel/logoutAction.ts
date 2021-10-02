import {declareAction} from "@reatom/core";
import { AuthenticationApi } from "../../api/authenticationApi";


const logoutAction = declareAction(
    (payload, store) => {
        AuthenticationApi.logOut()
            .then((resp) => {
                console.log(resp);
                // dispatch(setUserUnitialized());
            })
            .catch((err) => console.log(err));
    }
)

export {
    logoutAction,
}