import {MainInfoBlock} from "./MainInfoBlock";
import {PasswordBlock} from "./PasswordBlock";
import {UserInfoBlock} from "./UserInfoBlock";
import {useInitProfileSettings} from "../../../viewmodel/settingsPopup/userProfile/useInitProfileSettings";
import styles from './ProfileSettingsPage.module.css'

function ProfileSettingsPage() {
    useInitProfileSettings()

    return (
        <div className={styles.pageContainer}>
            <UserInfoBlock />
            <MainInfoBlock/>
            <PasswordBlock/>
        </div>
    )
}

export {
    ProfileSettingsPage,
}