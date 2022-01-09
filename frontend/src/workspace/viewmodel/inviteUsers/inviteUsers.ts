import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {EventsApi} from "../../../api/eventsApi";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {loadAbsentUsers} from "../../../users/loadUsers";
import {editEventActions} from "../calendar/editPopup/editEvent";
import {usersAtom} from "../../../users/usersAtom";
import {authorizedCurrentUser} from "../../../authentication/viewModel/currentUserAtom";
import {addToSet, removeFromSet} from "../../../common/immutable/set";
import {editWorkspacePopupActions} from "../editWorkspacePopup/editWorkspacePopup";

type InviteUsersPopupType = 'event' | 'workspace'

const open = declareAction<InviteUsersPopupType>(
    'inviteUsers.open',
    (_, store) => {
        store.dispatch(inviteUsersPopupActions.loadUsersList())
    }
)
const close = declareAction('inviteUsers.close')

const typeAtom = declareAtom<InviteUsersPopupType>('inviteUsers.type', 'event', on => [
    on(open, (_, value) => value),
])

const [showAtom, setShow] = declareAtomWithSetter('inviteUsers.show', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const addSelectedUsers = declareAction<Array<string>>('inviteUsers.addSelectedUsers')
const removeSelectedUsers = declareAction<Array<string>>('inviteUsers.removeSelectedUsers')
const resetSelectedUsers = declareAction('inviteUsers.resetSelected')
const [selectedUsersIdsAtom, setSelectedUsersIds] = declareAtomWithSetter<Set<string>>('inviteUsers.selectedUsersIds', new Set<string>(), on => [
    on(open, () => new Set()),
    on(addSelectedUsers, (state, value) => addToSet(state, value)),
    on(removeSelectedUsers, (state, value) => removeFromSet(state, value)),
    on(resetSelectedUsers, () => new Set())
])

const loadUsersList = declareAsyncAction<void, Array<string>>(
    'loadUsersList',
    async (payload, store) => {

        return EventsApi.getUsersToInvite()
            .then(async ({userIds}) => {
                const currentUser = store.getState(authorizedCurrentUser)
                const withoutCurrent = userIds.filter(userId => userId !== currentUser.id)
                if (withoutCurrent.length > 0) {
                    await dispatchAsyncAction(store, loadAbsentUsers, withoutCurrent)
                }
                return Promise.resolve(withoutCurrent)
            })
    }
)

const usersListAtom = declareAtom<Array<string>>('inviteUsers.usersList', [], on => [
    on(loadUsersList.done, ((_, list) => list)),
])

const [searchPatternAtom, setSearchPattern] = declareAtomWithSetter('invitedUsers.searchPattern', '')

const searchedUsersAtom = map(
    combine({
        usersList: usersListAtom,
        searchPattern: searchPatternAtom,
        users: usersAtom,
    }),
    ({usersList, searchPattern, users}) => {
        if (!searchPattern) {
            return usersList
        }
        const regex = new RegExp(searchPattern)
        return usersList.filter(userId => {
            const user = users[userId]
            return user.username.match(regex) || user.email.match(regex)
        })
    }
)

const [isPopupLoadingAtom, setIsPopupLoading] = declareAtomWithSetter('inviteUsers.popupLoading', false, on => [
    on(open, () => true),
    on(loadUsersList.done, () => false),
    on(loadUsersList.fail, () => false),
])

const submit = declareAction(
    'inviteUsers.inviteUsers',
    (_, store) => {
        const selectedUsersIds = store.getState(selectedUsersIdsAtom)
        const popupType = store.getState(typeAtom)
        switch (popupType) {
            case 'event':
                store.dispatch(editEventActions.addInvitedUsers(Array.from(selectedUsersIds)))
                break
            case "workspace":
                store.dispatch(editWorkspacePopupActions.addInvitedUsers(Array.from(selectedUsersIds)))
                break
        }
        store.dispatch(inviteUsersPopupActions.close())
    }
)

const submitButtonStateAtom = map(
    combine({
        isPopupLoading: isPopupLoadingAtom,
    }),
    ({isPopupLoading}) => {
        return isPopupLoading
            ? 'preloader'
            : 'normal'
    }
)

const inviteUsersPopupAtom = combine({
    show: showAtom,
    type: typeAtom,
    selectedUsersIds: selectedUsersIdsAtom,
    isPopupLoading: isPopupLoadingAtom,
    submitButtonState: submitButtonStateAtom,
    usersList: usersListAtom,
    searchPattern: searchPatternAtom,
    searchedUsers: searchedUsersAtom,
})

const inviteUsersPopupActions = {
    setShow,
    open,
    close,
    setIsPopupLoading,
    addSelectedUsers,
    removeSelectedUsers,
    setSelectedUsersIds,
    submit,
    loadUsersList,
    setSearchPattern,
    resetSelectedUsers,
}

export {
    inviteUsersPopupAtom,
    inviteUsersPopupActions,
}

export type {
    InviteUsersPopupType,
}