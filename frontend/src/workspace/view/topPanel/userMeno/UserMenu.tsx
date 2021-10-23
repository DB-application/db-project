import {AvatarWrapper} from "../../../../common/avatar/Avatar";
import {useAction, useAtom} from "@reatom/react";
import {authorizedUser} from "../../../../authentication/viewModel/userAtom";
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

type UserMenuPopoverProps = {
    onLogout: () => void,
}

function UserMenuPopover({
    onLogout,
}: UserMenuPopoverProps) {
    const items: Array<ListItemProps|null> = [
        {
            id: 'profileSetting',
            createBindingFn: () => <ListItem_IconAndText
                icon={<ProfileIcon />}
                text={'Профиль пользователя'}
                onClick={() => goToUrl('/profile')}
            />,
        },
        {
            id: 'help',
            createBindingFn: () => <ListItem_IconAndText
                icon={<HelpCircleOutlineIcon/>}
                text={'Помощь'}
                onClick={() => goToUrl('/help')}
            />,
        },
        null,
        {
            id: 'logout',
            createBindingFn: () => <ListItem_IconAndText
                icon={<LogoutIcon />}
                text={'Выйти'}
                onClick={onLogout}
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
    const user = useAtom(authorizedUser)
    const logout = useAction(logoutAction)

    return (
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
            <PopoverPortal
                elementRef={ref}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<UserMenuPopover
                    onLogout={logout}
                />}
                align={'right'}
            />
        </div>
    )
}

export {
    UserMenu,
}