import {Store} from "@reatom/core"
import {UserApi} from "../api/userApi";
import {authorizedUser} from "../authentication/viewModel/userAtom";
import {HttpStatus} from "../core/http/HttpStatus";

type ChangePasswordPayload = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

type ChangePasswordResultType = 'OldPasswordIncorrect'
    | 'ConfirmPasswordMismatch'
    | 'NewPasswordSame'
    | 'UnknownError'
    | 'Success'

async function changePassword(store: Store, {
    oldPassword,
    newPassword,
    confirmPassword,
}: ChangePasswordPayload): Promise<ChangePasswordResultType> {
    const user = store.getState(authorizedUser)
    if (confirmPassword !== newPassword) {
        return 'ConfirmPasswordMismatch'
    }
    if (newPassword === oldPassword) {
        return 'NewPasswordSame'
    }
    const response = await UserApi.changePassword({
        userId: user.id,
        newPassword,
        oldPassword,
    })

    switch (response.status) {
        case HttpStatus.OK:
            return 'Success'
        case HttpStatus.BAD_REQUEST:
            return "OldPasswordIncorrect"
        default:
            return 'UnknownError'
    }
}

export {
    changePassword,
}