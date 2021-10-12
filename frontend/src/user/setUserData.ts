import {Store} from "@reatom/core";
import {UserApi} from "../api/userApi";
import {authorizedUser, userActions} from "../authentication/viewModel/userAtom";

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
        nickname
    })
        .then(response => {
            if (response.status == 200) {
                store.dispatch(userActions.setUserData({
                    ...user,
                    nickname,
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