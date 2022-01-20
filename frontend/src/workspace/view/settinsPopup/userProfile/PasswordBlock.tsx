import {useAction, useAtom} from "@reatom/react";
import {passwordSettingsAction, passwordSettingsAtom } from "../../../viewmodel/settingsPopup/userProfile/passwordSettings";
import styles from './PasswordBlock.module.css'
import {I18n_get} from "../../../../i18n/i18n_get";
import {TextField} from "../../../../common/textfield/TextField";
import {Button_Text} from "../../../../common/button/Button_Text";
import {getPasswordErrorText} from "../../../viewmodel/settingsPopup/userProfile/getPasswordErrorText";

function PasswordBlock() {
    const {
        newPassword,
        oldPassword,
        confirmPassword,
        confirmPasswordError,
        oldPasswordError,
        newPasswordError,
        saveButtonState,
    } = useAtom(passwordSettingsAtom)
    const handleSetOldPassword = useAction(passwordSettingsAction.setOldPassword)
    const handleSetNewPassword = useAction(passwordSettingsAction.setNewPassword)
    const handleSetConfirmPassword = useAction(passwordSettingsAction.setConfirmPassword)
    const handleSubmitChange = useAction(passwordSettingsAction.submitChangePassword)

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                {I18n_get("ProfileSettings.PasswordLabel")}
            </div>
            <TextField
                type={'password'}
                value={oldPassword}
                onChange={handleSetOldPassword}
                errorText={getPasswordErrorText(oldPasswordError)}
                description={I18n_get("ProfileSettings.OldPassword")}
                className={styles.fieldBlock}
            />
            <TextField
                type={'password'}
                value={newPassword}
                onChange={handleSetNewPassword}
                errorText={getPasswordErrorText(newPasswordError)}
                description={I18n_get("ProfileSettings.NewPassword")}
                className={styles.fieldBlock}
            />
            <TextField
                type={'password'}
                value={confirmPassword}
                onChange={handleSetConfirmPassword}
                errorText={getPasswordErrorText(confirmPasswordError)}
                description={I18n_get("ProfileSettings.ConfirmPassword")}
                className={styles.fieldBlock}
            />
            <Button_Text
                state={saveButtonState}
                text={I18n_get("ProfileSettings.PasswordChangeButton")}
                onClick={handleSubmitChange}
                className={styles.saveButton}
                style={'primary'}
            />
        </div>
    )
}

export {
    PasswordBlock,
}