import {declareAction} from "@reatom/core";
import {currentUserActions} from "../authentication/viewModel/currentUserAtom";
import {processStandardError} from "../core/error/processStandardError";
import {CurrentUserApi} from "../api/currentUserApi";
import {setIsLoadingApp} from "../appLayout/isLoadingApp";
import {usersActions} from "../users/usersAtom";

const initUserDataAction = declareAction((_, store) => {
    CurrentUserApi.getUserData()
        .then((data) => {
            store.dispatch(currentUserActions.setCurrentUserData({ ...data, isAuthUser: true }));
            store.dispatch(usersActions.updateUser({...data}))
            store.dispatch(setIsLoadingApp(false))
        })
        .catch(() => {
            store.dispatch(setIsLoadingApp(false))
        })
        .finally(() => {});
});

export {
    initUserDataAction,
}