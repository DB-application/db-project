import {MainInfoBlock} from "./MainInfoBlock";
import {PasswordBlock} from "./PasswordBlock";
import {UserInfoBlock} from "./UserInfoBlock";
import {useInitProfileSettings} from "../../../viewmodel/settingsPopup/userProfile/useInitProfileSettings";
import styles from './ProfileSettingsPage.module.css'
import {PageHeader} from "../common/PageHeader";
import {I18n_get} from "../../../../i18n/i18n_get";

function ProfileSettingsPage() {
    useInitProfileSettings()

    return (
        <div className={styles.pageContainer}>
            <PageHeader
                title={I18n_get('SettingsPopup.UserProfile')}
            />
            <UserInfoBlock />
            <MainInfoBlock/>
            <PasswordBlock/>
        </div>
    )
}

export {
    ProfileSettingsPage,
}