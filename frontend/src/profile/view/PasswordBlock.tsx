import {useAction, useAtom} from "@reatom/react";
import {passwordSettingsAction, passwordSettingsAtom} from "../model/passwordSettings";
import styles from './PasswordBlock.module.css'
import {TextField} from "../../common/textfield/TextField";
import {Button_Text} from "../../common/button/Button_Text";
import {I18n_get} from "../../i18n/i18n_get";

function PasswordBlock() {
    const {
        newPassword,
        oldPassword,
        confirmPassword,
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
                description={I18n_get("ProfileSettings.OldPassword")}
                className={styles.fieldBlock}
            />
            <TextField
                type={'password'}
                value={newPassword}
                onChange={handleSetNewPassword}
                description={I18n_get("ProfileSettings.NewPassword")}
                className={styles.fieldBlock}
            />
            <TextField
                type={'password'}
                value={confirmPassword}
                onChange={handleSetConfirmPassword}
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