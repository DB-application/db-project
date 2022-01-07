import styles from './Sidebar.module.css'
import {useAction, useAtom} from "@reatom/react";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {
    settingsPopupActions,
    settingsPopupAtom,
    SettingsPopupPageType
} from "../../viewmodel/settingsPopup/settingsPopup";
import {List_Base, ListItemProps} from "../../../common/list/List_Base";
import {ListItem_IconAndText} from "../../../common/list/item/ListItem_IconAndText";
import { ProfileIcon } from '../../../icons/ProfileIcon';
import {GlobeIcon} from "../../../icons/GlobeIcon";
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";

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
            createBindingFn: () => <ListItem_IconAndText
                icon={<ProfileIcon/>}
                text={'Профиль'}
                onClick={() => handleSetActivePage('profile')}
                className={generateItemClassName(activePage, 'profile')}
            />
        },
        {
            id: 'language',
            createBindingFn: () => <ListItem_IconAndText
                icon={<GlobeIcon/>}
                text={'Язык и регион'}
                onClick={() => handleSetActivePage('language')}
                className={generateItemClassName(activePage, 'language')}
            />
        }
    ]

    return (
        <div className={styles.list}>
            <List_Base items={listItems}/>
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