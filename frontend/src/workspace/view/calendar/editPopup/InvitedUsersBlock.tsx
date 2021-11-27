import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {editEventActions, editEventAtom} from "../../../viewmodel/calendar/editPopup/editEvent";
import {useAction, useAtom} from "@reatom/react";
import {inviteUsersPopupActions} from "../../../viewmodel/calendar/inviteUsers/inviteUsers";
import {usersAtom} from "../../../../users/usersAtom";
import {UserData} from "../../../../common/UserData";
import styles from "./InvitedUsersBlock.module.css";
import {I18n_get} from "../../../../i18n/i18n_get";
import {Button_IconAndText} from "../../../../common/button/Button_IconAndText";
import {PlusCircleIcon} from "../../../../icons/PlusCircleIcon";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import {Button_Text} from "../../../../common/button/Button_Text";
import {authorizedCurrentUser} from "../../../../authentication/viewModel/currentUserAtom";
import {calendarAtom} from "../../../viewmodel/calendar/calendar";

type UsersListItemProps = {
    user: UserData,
    isCurrentUser?: boolean,
}

function OrganizerLabel() {
    return (
        <div className={styles.organizerLabel}>
            {I18n_get('EditEventPopup.OrganizerLabel')}
        </div>
    )
}

function UsersListItem({
    user,
    isCurrentUser = false,
}: UsersListItemProps) {
    const handleRemoveUsers = useAction(editEventActions.removeInvitedUser)

    return (
        <div className={styles.listItem}>
            <UserInfo
                user={user}
                size={'small'}
            />
            {!isCurrentUser
                ? <Button_Text
                    text={'Удалить'}
                    onClick={() => handleRemoveUsers(user.id)}
                    style={'link'}
                />
                : <OrganizerLabel />
            }
        </div>
    )
}

function InvitedUsersList() {
    const invitedUsers = useAtomWithSelector(editEventAtom, x => x.invitedUsers)
    const currentUser = useAtom(authorizedCurrentUser)
    const users = useAtom(usersAtom)

    const usersData: Array<UserData> = invitedUsers.map(userId => users[userId])
        .filter(user => user)
        .sort((user1, user2) => user1.username < user2.username ? -1 : 1)

    return (
        <div className={styles.usersList}>
            <UsersListItem
                user={currentUser}
                isCurrentUser={true}
            />
            {usersData.map(user => <UsersListItem
                key={user.id}
                user={user}
            />)}
        </div>
    )
}

function InvitedUsersBlock() {
    const handleInviteUsersPopupOpen = useAction(inviteUsersPopupActions.open)

    return (
        <div className={styles.contentBlock}>
            <div className={styles.fieldDescription}>
                {I18n_get('EditEventPopup.InvitedUsersLabel')}
                <Button_IconAndText
                    icon={<PlusCircleIcon />}
                    text={I18n_get('EditEventPopup.InviteUsers')}
                    onClick={handleInviteUsersPopupOpen}
                    style={'primary'}
                    size={'small'}
                />
            </div>
            <div className={styles.inviteUsersRow}>
                <InvitedUsersList />
            </div>
        </div>
    )
}

export {
    InvitedUsersBlock,
}