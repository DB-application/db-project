import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {EventsApi} from "../../../../api/eventsApi";
import {dispatchAsyncAction} from "../../../../core/reatom/dispatchAsyncAction";
import {loadAbsentUsers} from "../../../../users/loadUsers";
import {editEventActions} from "../editPopup/editEvent";
import {usersAtom} from "../../../../users/usersAtom";


const open = declareAction(
    'inviteUsers.open',
    (_, store) => {
        store.dispatch(inviteUsersPopupActions.loadUsersList())
    }
)
const close = declareAction('inviteUsers.close')

const [showAtom, setShow] = declareAtomWithSetter('inviteUsers.show', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const addSelectedUsers = declareAction<Array<string>>('inviteUsers.addSelectedUsers')
const removeSelectedUsers = declareAction<Array<string>>('inviteUsers.removeSelectedUsers')
const resetSelectedUsers = declareAction('inviteUsers.resetSelected')
const [selectedUsersIdsAtom, setSelectedUsersIds] = declareAtomWithSetter<Set<string>>('inviteUsers.selectedUsersIds', new Set<string>(), on => [
    on(open, () => new Set()),
    on(addSelectedUsers, (state, value) => new Set([
        ...Array.from(state.values()),
        ...value,
    ])),
    on(removeSelectedUsers, (state, value) => new Set([
        ...Array.from(state.values()).filter(userId => !value.includes(userId)),
    ])),
    on(resetSelectedUsers, () => new Set())
])

const loadUsersList = declareAsyncAction<void, Array<string>>(
    'loadUsersList',
    async (payload, store) => {

        return EventsApi.getUsersToInvite()
            .then(async ({userIds}) => {
                if (userIds.length > 0) {
                    await dispatchAsyncAction(store, loadAbsentUsers, userIds)
                }
                return Promise.resolve(userIds)
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
        store.dispatch(editEventActions.addInvitedUsers(Array.from(selectedUsersIds)))
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