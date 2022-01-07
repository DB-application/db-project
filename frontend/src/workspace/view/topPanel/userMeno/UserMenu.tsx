import {AvatarWrapper} from "../../../../common/avatar/Avatar";
import {useAction, useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../../../authentication/viewModel/currentUserAtom";
import styles from "./UserMenu.module.css";
import React, {useRef, useState} from "react";
import {List_Base, ListItemProps} from "../../../../common/list/List_Base";
import {ListItem_IconAndText} from "../../../../common/list/item/ListItem_IconAndText";
import {ProfileIcon} from "../../../../icons/ProfileIcon";
import {HelpCircleOutlineIcon} from "../../../../icons/HelpCircleOutlineIcon";
import {LogoutIcon} from "../../../../icons/LogoutIcon";
import {goToUrl} from "../../../../core/link/goToUrl";
import {logoutAction} from "../../../../authentication/viewModel/actions/logoutAction";
import {PopoverPortal} from "../../../../core/portal/PopoverPortal";
import {settingsPopupActions} from "../../../viewmodel/settingsPopup/settingsPopup";
import {I18n_get} from "../../../../i18n/i18n_get";

type UserMenuPopoverProps = {
    onLogout: () => void,
    onClick: () => void,
}

function UserMenuPopover({
    onLogout,
    onClick,
}: UserMenuPopoverProps) {
    const handleOpenSettingsPopup = useAction(settingsPopupActions.open)
    const items: Array<ListItemProps|null> = [
        {
            id: 'profileSetting',
            createBindingFn: () => <ListItem_IconAndText
                icon={<ProfileIcon />}
                text={I18n_get('Workspace.UserProfile')}
                onClick={() => {
                    handleOpenSettingsPopup('profile')
                    onClick()
                }}
                className={styles.listItem}
            />,
        },
        {
            id: 'help',
            createBindingFn: () => <ListItem_IconAndText
                icon={<HelpCircleOutlineIcon/>}
                text={I18n_get('Workspace.Help')}
                onClick={() => {
                    goToUrl('/help')
                    onClick()
                }}
                className={styles.listItem}
            />,
        },
        null,
        {
            id: 'logout',
            createBindingFn: () => <ListItem_IconAndText
                icon={<LogoutIcon />}
                text={I18n_get('Workspace.Logout')}
                onClick={() => {
                    onLogout()
                    onClick()
                }}
                className={styles.listItem}
            />,
        },
    ]

    return (
        <div className={styles.userMenuPopover}>
            <List_Base
                items={items}
           />
        </div>
    )
}


function UserMenu() {
    const ref = useRef<HTMLDivElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)
    const user = useAtom(authorizedCurrentUser)
    const logout = useAction(logoutAction)

    return (
        <>
            <div
                ref={ref}
                className={styles.userMenu}
                onClick={() => setPopoverOpened(true)}
            >
                <AvatarWrapper
                    label={user.username}
                    size={'small'}
                    avatarUrl={user.avatarUrl}
                    className={styles.avatar}
                />
            </div>
            <PopoverPortal
                elementRef={ref}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<UserMenuPopover
                    onLogout={logout}
                    onClick={() => setPopoverOpened(false)}
                />}
                align={'right'}
            />
        </>
    )
}

export {
    UserMenu,
    UserMenuPopover,
}