import styles from './MainInfoBlock.module.css'
import {useAction, useAtom} from "@reatom/react";
import {TextField} from "../../common/textfield/TextField";
import {profileSettingsActions, profileSettingsAtom} from "../model/profileSettings";
import {Button_Text} from "../../common/button/Button_Text";
import {I18n_get} from "../../i18n/i18n_get";

function MainInfoBlock() {
    const {
        firstName,
        lastName,
        nickname,
        email,
        phoneNumber,
        saveProfileInfoState,
    } = useAtom(profileSettingsAtom)
    const handleSetFirstName = useAction(profileSettingsActions.setFirstName)
    const handleSetLastName = useAction(profileSettingsActions.setLastName)
    const handleSetNickname = useAction(profileSettingsActions.setNickname)
    const handleSetEmail = useAction(profileSettingsActions.setEmail)
    const handleSetPhone = useAction(profileSettingsActions.setPhoneNumber)
    const handleSaveInfo = useAction(profileSettingsActions.saveProfileInfo)


    return (
        <div className={styles.blockContainer}>
            <div className={styles.label}>
                {I18n_get('ProfileSettings.ProfileLabel')}
            </div>
            <TextField
                value={firstName}
                onChange={handleSetFirstName}
                description={I18n_get('ProfileSettings.FirstnameLabel')}
                className={styles.fieldBlock}
            />
            <TextField
                value={lastName}
                onChange={handleSetLastName}
                description={I18n_get('ProfileSettings.LastnameLabel')}
                className={styles.fieldBlock}
            />
            <TextField
                value={nickname}
                onChange={handleSetNickname}
                description={I18n_get('ProfileSettings.NicknameLabel')}
                className={styles.fieldBlock}
            />
            <TextField
                value={email}
                onChange={handleSetEmail}
                description={I18n_get('ProfileSettings.EmailLabel')}
                className={styles.fieldBlock}
            />
            <TextField
                type={'tel'}
                value={phoneNumber}
                onChange={handleSetPhone}
                description={I18n_get('ProfileSettings.PhoneLabel')}
                className={styles.fieldBlock}
            />
            <Button_Text
                text={I18n_get('ProfileSettings.SaveInfo')}
                onClick={handleSaveInfo}
                className={styles.saveButton}
                state={saveProfileInfoState}
            />
        </div>
    )
}

export {
    MainInfoBlock,
}