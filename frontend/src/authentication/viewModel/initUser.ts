import { declareAction } from "@reatom/core";
import { AuthenticationApi } from "../../api/authenticationApi";
import {userActions} from "./userAtom";

const initUserDataAction = declareAction((_, store) => {
    AuthenticationApi.getUserData()
        .then((data) => {
            store.dispatch(userActions.setUserDataAction({ ...data, isAuthUser: true }));
        })
        .finally(() => {});
});

export {
    initUserDataAction,
}