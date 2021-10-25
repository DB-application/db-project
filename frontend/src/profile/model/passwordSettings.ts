import {combine, declareAction} from "@reatom/core";
import {toast} from "react-toastify";
import {Button_State_Type} from "../../common/button/Button_Base";
import {changePassword} from "../../user/changePassword";
import {I18n_get} from "../../i18n/i18n_get";
import {declareAtomWithSetter} from "../../core/reatom/declareAtomWithSetter";
import {processStandardError} from "../../core/error/processStandardError";


const [oldPasswordAtom, setOldPassword] = declareAtomWithSetter('passwordSettings.oldPassword', '')

const [newPasswordAtom, setNewPassword] = declareAtomWithSetter('passwordSettings.newPassword', '')

const [confirmPasswordAtom, setConfirmPassword] = declareAtomWithSetter('passwordSettings.confirmPassword', '')

const [saveButtonStateAtom, setSaveButtonState] = declareAtomWithSetter<Button_State_Type>('passwordSettings.saveButtonState', 'normal')

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
            case "OldPasswordIncorrect":
                toast.error(I18n_get('ProfileSettings.OldPasswordIsIncorrect'))
                break
            default:
                processStandardError()
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