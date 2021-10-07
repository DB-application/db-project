import { declareAction } from "@reatom/core";
import { AuthenticationApi } from "../../api/authenticationApi";
import {userActions} from "./userAtom";
import {processStandardError} from "../../core/error/processStandardError";

const initUserDataAction = declareAction((_, store) => {
    AuthenticationApi.getUserData()
        .then((data) => {
            store.dispatch(userActions.setUserData({ ...data, isAuthUser: true }));
        })
        .catch(processStandardError)
        .finally(() => {});
});

export {
    initUserDataAction,
}