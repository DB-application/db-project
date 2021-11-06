import {Store} from "@reatom/core";
import {CurrentUserApi} from "../api/currentUserApi";
import {authorizedCurrentUser, currentUserActions} from "../authentication/viewModel/currentUserAtom";
import { HttpStatus } from "../core/http/HttpStatus";

type SetUserInfoPayload = {
    email: string,
    phoneNumber: string,
    lastName: string,
    firstName: string,
    nickname: string,
}

function setUserInfo(store: Store, {
    email,
    phoneNumber,
    lastName,
    firstName,
    nickname,
}: SetUserInfoPayload) {
    const user = store.getState(authorizedCurrentUser)
    return CurrentUserApi.setUserInfo({
        firstName,
        lastName,
        phoneNumber,
        email,
        userId: user.id,
        username: nickname,
    })
        .then(response => {
            if (response.status === HttpStatus.OK) {
                store.dispatch(currentUserActions.setCurrentUserData({
                    ...user,
                    username: nickname,
                    email,
                    firstName,
                    lastName,
                    phone: phoneNumber,
                }))
            }
        })
}

export {
    setUserInfo,
}