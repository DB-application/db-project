import styles from './MainInfoBlock.module.css'
import {useAction, useAtom} from "@reatom/react";
import {
    profileSettingsActions,
    profileSettingsAtom
} from '../../../viewmodel/settingsPopup/userProfile/profileSettings';
import {I18n_get} from "../../../../i18n/i18n_get";
import {TextField} from "../../../../common/textfield/TextField";
import {ButtonText} from "../../../../common/button/ButtonText";

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
            <ButtonText
                text={I18n_get('ProfileSettings.SaveInfo')}
                onClick={handleSaveInfo}
                className={styles.saveButton}
                state={saveProfileInfoState}
                style={'primary'}
            />
        </div>
    )
}

export {
    MainInfoBlock,
}