import {UserType} from "../../user/UserType";
import styles from './UserList.module.css'
import {List_Base, ListItemProps} from "../list/List_Base";
import {UserInfo} from "../userInfo/UserInfo";

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

    return <UserInfo
        user={user}
        onClick={onClick}
        size={'small'}
        className={styles.item}
    />
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