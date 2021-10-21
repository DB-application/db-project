import {Store} from "@reatom/core";
import {UserApi} from "../api/userApi";
import {authorizedUser, userActions} from "../authentication/viewModel/userAtom";
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
    const user = store.getState(authorizedUser)
    return UserApi.setUserInfo({
        firstName,
        lastName,
        phoneNumber,
        email,
        userId: user.id,
        username: nickname,
    })
        .then(response => {
            if (response.status === HttpStatus.OK) {
                store.dispatch(userActions.setUserData({
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