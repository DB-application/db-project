import {useAction} from "@reatom/react";
import {Popup} from "../../../common/popup/Popup";
import {settingsPopupActions} from "../../viewmodel/settingsPopup/settingsPopup";
import styles from './SettinsPopup.module.css'
import {Sidebar} from "./Sidebar";
import {ContentArea} from "./ContentArea";


function ContentWrapper() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <ContentArea />
        </div>
    )
}

function SettingsPopup() {
    const handleClosePopup = useAction(settingsPopupActions.close)

    return <Popup
        type={'contentOnly'}
        content={<ContentWrapper />}
        closePopup={handleClosePopup}
    />
}

export {
    SettingsPopup,
}