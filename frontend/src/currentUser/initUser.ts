import {declareAction} from "@reatom/core";
import {currentUserActions} from "../authentication/viewModel/currentUserAtom";
import {processStandardError} from "../core/error/processStandardError";
import {CurrentUserApi} from "../api/currentUserApi";
import {setIsLoadingApp} from "../appLayout/isLoadingApp";

const initUserDataAction = declareAction((_, store) => {
    CurrentUserApi.getUserData()
        .then((data) => {
            store.dispatch(currentUserActions.setCurrentUserData({ ...data, isAuthUser: true }));
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