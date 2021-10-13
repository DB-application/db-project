import { Store } from "@reatom/core"
import { UserApi } from "../api/userApi";
import {authorizedUser, userAtom} from "../authentication/viewModel/userAtom";

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
    if (newPassword == oldPassword) {
        return 'NewPasswordSame'
    }
    const response = await UserApi.changePassword({
        userId: user.id,
        newPassword,
        oldPassword,
    })

    switch (response.status) {
        case 200:
            return 'Success'
        default:
            return "OldPasswordIncorrect"
    }
}

export {
    changePassword,
}