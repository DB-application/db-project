import {MainInfoBlock} from "./MainInfoBlock";
import {useInitProfileSettings} from "../model/useInitProfileSettings";
import {PasswordBlock} from "./PasswordBlock";
import {UserInfoBlock} from "./UserInfoBlock";

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