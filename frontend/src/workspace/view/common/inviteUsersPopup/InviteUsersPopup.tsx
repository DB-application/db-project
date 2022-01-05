import {Popup} from "../../../../common/popup/Popup";
import {I18n_get} from "../../../../i18n/i18n_get";
import {Button_Text} from "../../../../common/button/Button_Text";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {inviteUsersPopupActions, inviteUsersPopupAtom} from "../../../viewmodel/calendar/inviteUsers/inviteUsers";
import {useRef} from "react";
import styles from "./InviteUsersPopup.module.css";
import {UserData} from "../../../../common/UserData";
import {Checkbox} from "../../../../common/checkbox/Checkbox";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import {useEventHandler} from "../../../../core/hooks/useEventHandler";
import {ContainerWithPreloader} from "../../../../common/ContainerWithPreloader";
import {usersAtom} from "../../../../users/usersAtom";
import {SearchField} from "../../../../common/textfield/SearchField";

type UsersListItemProps = {
    userData: UserData
    selected: boolean,
    onCheckedChange: (value: boolean) => void,
}

function UsersListItem({
    userData,
    onCheckedChange,
    selected,
}: UsersListItemProps) {
    const listRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('click', listRef, event => {
        if (!event.defaultPrevented) {
            onCheckedChange(!selected)
        }
    })

    return (
        <div
            ref={listRef}
            className={styles.listItem}
        >
            <div className={styles.checkbox}>
                <Checkbox
                    checked={selected}
                    onCheckedChange={onCheckedChange}
                />
            </div>
            <UserInfo
                user={userData}
                size={'small'}
                className={styles.userInfo}
            />
        </div>
    )
}

function UsersList() {
    const selectedUsersIds = useAtomWithSelector(inviteUsersPopupAtom, x => x.selectedUsersIds)
    const searchedUsers = useAtomWithSelector(inviteUsersPopupAtom, x => x.searchedUsers)
    const users = useAtom(usersAtom)
    const handleAddToSelected = useAction(inviteUsersPopupActions.addSelectedUsers)
    const handleRemoveSelectedUsers = useAction(inviteUsersPopupActions.removeSelectedUsers)

    const items = searchedUsers.map(userId => {
        const user = users[userId]
        if (!user) {
            return null
        }
        return <UsersListItem
            key={user.id}
            userData={{
                avatarUrl: user.avatarUrl,
                id: user.id,
                username: user.username,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }}
            selected={selectedUsersIds.has(user.id)}
            onCheckedChange={checked => checked
                ? handleAddToSelected([user.id])
                : handleRemoveSelectedUsers([user.id])}
        />
    })

    return (
        <>
            {items}
        </>
    )
}

function SearchUsersField() {
    const searchedUsers = useAtomWithSelector(inviteUsersPopupAtom, x => x.searchedUsers)
    const selectedUsersIds = useAtomWithSelector(inviteUsersPopupAtom, x => x.selectedUsersIds)
    const searchPattern = useAtomWithSelector(inviteUsersPopupAtom, x => x.searchPattern)
    const handleSetSearchPattern = useAction(inviteUsersPopupActions.setSearchPattern)
    const handleResetSelectedUsers = useAction(inviteUsersPopupActions.resetSelectedUsers)
    const handleAddSelectedUsers = useAction(inviteUsersPopupActions.addSelectedUsers)

    const allShowedSelected = searchedUsers.every(searched => selectedUsersIds.has(searched))

    return (
        <div
            className={styles.searchWrapper}
        >
            <div className={styles.checkbox}>
                <Checkbox
                    checked={allShowedSelected}
                    onCheckedChange={value => value
                        ? handleAddSelectedUsers(searchedUsers)
                        : handleResetSelectedUsers()
                    }
                />
            </div>
            <SearchField
                value={searchPattern}
                onChange={handleSetSearchPattern}
                placeholder={'Найти пользователя'}
                className={styles.searchField}
            />
        </div>
    )
}

function Content() {
    return (
        <div className={styles.content}>
            <SearchUsersField />
            <UsersList />
        </div>
    )
}

function ContentWrapper() {
    const isPopupLoading = useAtomWithSelector(inviteUsersPopupAtom, x => x.isPopupLoading)

    return (
        <ContainerWithPreloader
            content={<Content />}
            isPopupLoading={isPopupLoading}
            className={styles.container}
        />
    )
}

function InviteUsersPopup() {
    const submitButtonState = useAtomWithSelector(inviteUsersPopupAtom, x => x.submitButtonState)
    const handleClosePopup = useAction(inviteUsersPopupActions.close)
    const handleSubmit = useAction(inviteUsersPopupActions.submit)

    return <Popup
        type={'withHeaderAndFooter'}
        headerText={I18n_get('InviteUsersPopup.Title')}
        content={<ContentWrapper/>}
        acceptButton={<Button_Text
            text={I18n_get('InviteUsersPopup.Invite')}
            onClick={handleSubmit}
            style={'primary'}
            state={submitButtonState}
        />}
        closePopup={handleClosePopup}
    />
}

export {
    InviteUsersPopup,
}