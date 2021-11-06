import {UserType} from "../../user/UserType";
import styles from './UserList.module.css'
import {List_Base, ListItemProps} from "../list/List_Base";
import {UserInfo} from "../userInfo/UserInfo";
import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {useRef, useState} from "react";
import {UserInfoPopover} from "../userInfo/UserInfoPopover";

type UserListProps = {
    users: Array<UserType>,
    onClick: (id: string) => void,
    className?: string,
}

type UserListItemProps = {
    user: UserType,
    onClick: () => void,
}

function UserListItem({
    user,
    onClick,
}: UserListItemProps) {
    const itemRef = useRef<HTMLDivElement>(null)
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)
    return (
        <>
            <div ref={itemRef} className={styles.itemContainer}>
                <UserInfo
                    user={user}
                    onClick={() => {
                        setPopoverOpened(true)
                        onClick()
                    }}
                    size={'small'}
                    className={styles.item}
                />
            </div>
            <PopoverPortal
                elementRef={itemRef}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<UserInfoPopover
                    user={user}
                />}
            />
        </>
    )
}

function UserList({
    users,
    onClick,
    className,
}: UserListProps,) {

    const items: Array<ListItemProps> = users.map(user => ({
        id: user.id,
        createBindingFn: () => <UserListItem
            user={user}
            onClick={() => onClick(user.id)}
        />
    }))

    return <List_Base
        items={items}
        className={className}
    />
}

export type {
    UserListProps,
}
export {
    UserList,
}