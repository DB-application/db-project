import {useAction, useAtom} from "@reatom/react";
import {inviteUsersPopupActions, InviteUsersPopupType} from "../../../viewmodel/inviteUsers/inviteUsers";
import {usersAtom} from "../../../../users/usersAtom";
import {UserData} from "../../../../common/UserData";
import styles from "./InvitedUsersBlock.module.css";
import {I18n_get} from "../../../../i18n/i18n_get";
import {Button_IconAndText} from "../../../../common/button/Button_IconAndText";
import {PlusCircleIcon} from "../../../../icons/PlusCircleIcon";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import {Button_Text} from "../../../../common/button/Button_Text";

type UsersListItemProps = {
    user: UserData,
    isOrganizer?: boolean,
    removeUserCallback: (userId: string) => void,
}

function OrganizerLabel() {
    return (
        <div className={styles.organizerLabel}>
            {I18n_get('Common.OrganizerLabel')}
        </div>
    )
}

function UsersListItem({
    user,
    isOrganizer = false,
    removeUserCallback,
}: UsersListItemProps) {
    return (
        <div className={styles.listItem}>
            <UserInfo
                user={user}
                size={'small'}
            />
            {!isOrganizer
                ? <Button_Text
                    text={'Удалить'}
                    onClick={() => removeUserCallback(user.id)}
                    style={'link'}
                />
                : <OrganizerLabel />
            }
        </div>
    )
}

type InvitedUsersListProps = {
    organizerId: string,
    invitedUsers: Array<string>,
    removeUserCallback: (userId: string) => void,
}

function InvitedUsersList({
    organizerId,
    invitedUsers,
    removeUserCallback,
}: InvitedUsersListProps) {
    const users = useAtom(usersAtom)

    const usersData: Array<UserData> = invitedUsers.map(userId => users[userId])
        .filter(user => user)
        .sort((user1, user2) => user1.username < user2.username ? -1 : 1)

    return (
        <div className={styles.usersList}>
            <UsersListItem
                user={users[organizerId]}
                isOrganizer={true}
                removeUserCallback={removeUserCallback}
            />
            {usersData.map(user => <UsersListItem
                key={user.id}
                user={user}
                removeUserCallback={removeUserCallback}
            />)}
        </div>
    )
}

type InvitedUsersBlockProps = {
    popupType: InviteUsersPopupType,
    organizerId: string,
    invitedUsers: Array<string>,
    removeUserCallback: (userId: string) => void,
}

function InvitedUsersBlock({
    organizerId,
    popupType,
    invitedUsers,
    removeUserCallback,
}: InvitedUsersBlockProps) {
    const handleInviteUsersPopupOpen = useAction(inviteUsersPopupActions.open)

    return (
        <div className={styles.contentBlock}>
            <div className={styles.fieldDescription}>
                {I18n_get('Common.InvitedUsersLabel')}
                <Button_IconAndText
                    icon={<PlusCircleIcon />}
                    text={I18n_get('Common.InviteUsers')}
                    onClick={() => handleInviteUsersPopupOpen(popupType)}
                    style={'primary'}
                    size={'small'}
                />
            </div>
            <div className={styles.inviteUsersRow}>
                <InvitedUsersList
                    organizerId={organizerId}
                    removeUserCallback={removeUserCallback}
                    invitedUsers={invitedUsers}
                />
            </div>
        </div>
    )
}

export {
    InvitedUsersBlock,
}