import styles from './Sidebar.module.css'
import {useAction} from "@reatom/react";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {
    settingsPopupActions,
    settingsPopupAtom,
    SettingsPopupPageType
} from "../../viewmodel/settingsPopup/settingsPopup";
import {ListBase, ListItemProps} from "../../../common/list/ListBase";
import {ListItemIconAndText} from "../../../common/list/item/ListItemIconAndText";
import { ProfileIcon } from '../../../icons/ProfileIcon';
import {GlobeIcon} from "../../../icons/GlobeIcon";
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";
import {I18n_get} from "../../../i18n/i18n_get";
import {CalendarMonthOutlineIcon} from "../../../icons/CalendarMonthOutlineIcon";

function generateItemClassName(activePage: SettingsPopupPageType, currentPage: SettingsPopupPageType) {
    return getStylesWithMods(styles.listItem, {
        [styles.selectedItem]: activePage === currentPage,
    })
}

function PagesList() {
    const activePage = useAtomWithSelector(settingsPopupAtom, x => x.activePage)
    const handleSetActivePage = useAction(settingsPopupActions.setActivePage)

    const listItems: Array<ListItemProps|null> = [
        {
            id: 'userProfile',
            createBindingFn: () => <ListItemIconAndText
                icon={<ProfileIcon/>}
                text={I18n_get('SettingsPopup.UserProfile')}
                onClick={() => handleSetActivePage('profile')}
                className={generateItemClassName(activePage, 'profile')}
            />
        },
        {
            id: 'language',
            createBindingFn: () => <ListItemIconAndText
                icon={<GlobeIcon/>}
                text={I18n_get('SettingsPopup.Language')}
                onClick={() => handleSetActivePage('language')}
                className={generateItemClassName(activePage, 'language')}
            />
        },
        {
            id: 'calendar',
            createBindingFn: () => <ListItemIconAndText
                icon={<CalendarMonthOutlineIcon/>}
                text={I18n_get('SettingsPopup.Calendar')}
                onClick={() => handleSetActivePage('calendar')}
                className={generateItemClassName(activePage, 'calendar')}
            />
        }
    ]

    return (
        <div className={styles.list}>
            <ListBase items={listItems}/>
        </div>
    )
}

function Sidebar() {

    return (
        <div className={styles.sidebarContainer} >
            <PagesList/>
        </div>
    )
}

export {
    Sidebar,
}