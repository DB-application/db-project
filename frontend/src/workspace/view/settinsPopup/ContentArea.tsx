import styles from './ContentArea.module.css'
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {settingsPopupAtom, SettingsPopupPageType} from "../../viewmodel/settingsPopup/settingsPopup";
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfileSettingsPage} from "./userProfile/ProfileSettingsPage";
import {LanguagePage} from "./language/LanguagePage";
import {CalendarSettingsPage} from "./calendar/CalendarSettingsPage";


function getContentBinding(activePage: SettingsPopupPageType, isLoading: boolean): JSX.Element {
    if (isLoading) {
        return <Preloader />
    }
    switch (activePage) {
        case "profile":
            return <ProfileSettingsPage/>
        case "language":
            return <LanguagePage/>
        case "calendar":
            return <CalendarSettingsPage/>
        default:
            throw new Error('unknown active page')
    }
}

function ContentArea() {
    const activePage = useAtomWithSelector(settingsPopupAtom, x => x.activePage)
    const isLoading = useAtomWithSelector(settingsPopupAtom, x => x.isLoading)

    const binding = getContentBinding(activePage, isLoading)

    return (
        <div className={styles.contentArea} >
            {binding}
        </div>
    )
}

export {
    ContentArea,
}