import {combine, declareAction} from "@reatom/core";
import {toast} from "react-toastify";
import {Button_State_Type} from "../../../../common/button/ButtonBase";
import {processStandardError} from "../../../../core/error/processStandardError";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {changePassword} from "../../../../currentUser/changePassword";
import {I18n_get} from "../../../../i18n/i18n_get";
import { PasswordErrorType } from "./PasswordErrorType";
import {validateConfirmPassword, validateNewPassword, validateOldPassword} from "./validation";

const [oldPasswordAtom, setOldPassword] = declareAtomWithSetter('passwordSettings.oldPassword', '')
const [oldPasswordErrorAtom, setOldPasswordError] = declareAtomWithSetter<PasswordErrorType|null>(
    'passwordSettings.oldPasswordError',
    null,
    on => [
        on(setOldPassword, () => null)
    ]
)

const [newPasswordAtom, setNewPassword] = declareAtomWithSetter('passwordSettings.newPassword', '')
const [newPasswordErrorAtom, setNewPasswordError] = declareAtomWithSetter<PasswordErrorType|null>(
    'passwordSettings.newPasswordError',
    null,
    on => [
        on(setNewPassword, () => null),
    ]
)

const [confirmPasswordAtom, setConfirmPassword] = declareAtomWithSetter('passwordSettings.confirmPassword', '')
const [confirmPasswordErrorAtom, setConfirmPasswordError] = declareAtomWithSetter<PasswordErrorType|null>(
    'passwordSettings.confirmPasswordError',
    null,
    on => [
        on(setConfirmPassword, () => null),
    ]
)

const [saveButtonStateAtom, setSaveButtonState] = declareAtomWithSetter<Button_State_Type>('passwordSettings.saveButtonState', 'normal')

const submitChangePassword = declareAction(
    async(_, store) => {
        const {
            oldPassword,
            newPassword,
            confirmPassword,
        } = store.getState(passwordSettingsAtom)
        store.dispatch(setSaveButtonState('preloader'))

        let oldPasswordError = validateOldPassword(oldPassword)
        let newPasswordError = validateNewPassword(newPassword)
        let confirmPasswordError = validateConfirmPassword(confirmPassword)

        if (!oldPasswordError && !newPasswordError && !confirmPasswordError) {
            const result = await changePassword(store, {
                oldPassword,
                newPassword,
                confirmPassword,
            })
            switch (result) {
                case "Success":
                    toast.success(I18n_get('ProfileSettings.SuccessChangePassword'))
                    break
                case "ConfirmPasswordMismatch":
                    confirmPasswordError = 'confirm_password_mismatch'
                    break
                case "NewPasswordSame":
                    newPasswordError = 'new_password_same'
                    break
                case "OldPasswordIncorrect":
                    oldPasswordError = 'wrong_old_password'
                    break
                default:
                    processStandardError()
            }
        }
        store.dispatch(passwordSettingsAction.setOldPasswordError(oldPasswordError))
        store.dispatch(passwordSettingsAction.setNewPasswordError(newPasswordError))
        store.dispatch(passwordSettingsAction.setConfirmPasswordError(confirmPasswordError))

        store.dispatch(setSaveButtonState('normal'))
    }
)

const passwordSettingsAtom = combine({
    oldPassword: oldPasswordAtom,
    newPassword: newPasswordAtom,
    confirmPassword: confirmPasswordAtom,

    oldPasswordError: oldPasswordErrorAtom,
    newPasswordError: newPasswordErrorAtom,
    confirmPasswordError: confirmPasswordErrorAtom,

    saveButtonState: saveButtonStateAtom,
})

const passwordSettingsAction = {
    setOldPassword,
    setNewPassword,
    setConfirmPassword,

    setOldPasswordError,
    setNewPasswordError,
    setConfirmPasswordError,

    setSaveButtonState,
    submitChangePassword,
}

export {
    passwordSettingsAtom,
    passwordSettingsAction,
}