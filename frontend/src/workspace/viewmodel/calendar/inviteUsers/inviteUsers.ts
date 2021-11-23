import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {EventsApi} from "../../../../api/eventsApi";
import {dispatchAsyncAction} from "../../../../core/reatom/dispatchAsyncAction";
import {loadAbsentUsers} from "../../../../users/loadUsers";
import {inviteUsersAction} from "../inviteUsersAction";
import {editEventActions, editEventAtom} from "../editPopup/editEvent";


const submit = declareAsyncAction<void, void>(
    'inviteUsers.inviteUsers',
    (_, store) => {
        const selectedUsersIds = store.getState(selectedUsersIdsAtom)
        return dispatchAsyncAction(store, inviteUsersAction, Array.from(selectedUsersIds))
            .then(() => {
                store.dispatch(editEventActions.addInvitedUsers(Array.from(selectedUsersIds)))
            })
    }
)

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
    on(submit.done, () => false),
])

const addSelectedUsers = declareAction<string>('inviteUsers.addSelectedUsers')
const removeSelectedUsers = declareAction<string>('inviteUsers.removeSelectedUsers')
const [selectedUsersIdsAtom, setSelectedUsersIds] = declareAtomWithSetter<Set<string>>('inviteUsers.selectedUsersIds', new Set<string>(), on => [
    on(open, () => new Set()),
    on(addSelectedUsers, (state, value) => new Set([
        ...Array.from(state.values()),
        value,
    ])),
    on(removeSelectedUsers, (state, value) => new Set([
        ...Array.from(state.values()).filter(userId => userId != value),
    ])),
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

const [isPopupLoadingAtom, setIsPopupLoading] = declareAtomWithSetter('inviteUsers.popupLoading', false, on => [
    on(open, () => true),
    on(loadUsersList.done, () => false),
    on(loadUsersList.fail, () => false),
    on(submit, () => true),
    on(submit.done, () => false),
    on(submit.fail, () => false),
])

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
}

export {
    inviteUsersPopupAtom,
    inviteUsersPopupActions,
}