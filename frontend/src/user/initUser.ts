import {declareAction} from "@reatom/core";
import {userActions} from "../authentication/viewModel/userAtom";
import {processStandardError} from "../core/error/processStandardError";
import {UserApi} from "../api/userApi";
import {setIsLoadingApp} from "../appLayout/isLoadingApp";

const initUserDataAction = declareAction((_, store) => {
    UserApi.getUserData()
        .then((data) => {
            store.dispatch(userActions.setUserData({ ...data, isAuthUser: true }));
            store.dispatch(setIsLoadingApp(false))
        })
        .catch(() => {
            store.dispatch(setIsLoadingApp(false))
            processStandardError()
        })
        .finally(() => {});
});

export {
    initUserDataAction,
}