import {combine, declareAction, declareAtom} from "@reatom/core";
import {toast} from "react-toastify";
import {Button_State_Type} from "../../common/button/Button_Base";
import {changePassword} from "../../user/changePassword";
import {I18n_get} from "../../i18n/i18n_get";


const setOldPassword = declareAction<string>()
const oldPasswordAtom = declareAtom('passwordSettings.oldPassword', '', on => [
    on(setOldPassword, (_, value) => value),
])

const setNewPassword = declareAction<string>()
const newPasswordAtom = declareAtom('passwordSettings.newPassword', '', on => [
    on(setNewPassword, (_, value) => value),
])

const setConfirmPassword = declareAction<string>()
const confirmPasswordAtom = declareAtom('passwordSettings.confirmPassword', '', on => [
    on(setConfirmPassword, (_, value) => value),
])

const setSaveButtonState = declareAction<Button_State_Type>()
const saveButtonStateAtom = declareAtom<Button_State_Type>('passwordSettings.saveButtonState', 'normal', on => [
    on(setSaveButtonState, (_, value) => value),
])

const submitChangePassword = declareAction(
    async(_, store) => {
        const {
            oldPassword,
            newPassword,
            confirmPassword,
        } = store.getState(passwordSettingsAtom)
        store.dispatch(setSaveButtonState('preloader'))
        const result = await changePassword(store, {
            oldPassword,
            newPassword,
            confirmPassword,
        })
        store.dispatch(setSaveButtonState('normal'))
        switch (result) {
            case "Success":
                toast.success(I18n_get('ProfileSettings.SuccessChangePassword'))
                break
            case "ConfirmPasswordMismatch":
                toast.error(I18n_get('ProfileSettings.PasswordIsDifferent'))
                break
            case "NewPasswordSame":
                toast.error(I18n_get('ProfileSettings.PasswordMustBeDifferent'))
                break
        }
    }
)

const passwordSettingsAtom = combine({
    oldPassword: oldPasswordAtom,
    newPassword: newPasswordAtom,
    confirmPassword: confirmPasswordAtom,
    saveButtonState: saveButtonStateAtom,
})

const passwordSettingsAction = {
    setOldPassword,
    setNewPassword,
    setConfirmPassword,
    setSaveButtonState,
    submitChangePassword,
}

export {
    passwordSettingsAtom,
    passwordSettingsAction,
}