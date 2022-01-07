import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {WorkspaceData} from "../workspace/workspace";
import {addToSet, removeFromSet} from "../../../common/immutable/set";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {editWorkspace} from "../workspace/editWorkspace";
import {deleteWorkspace} from "../workspace/deleteWorkspace";
import {loadInvitedUsers} from "../workspace/loadInvitedUsers";


const open = declareAsyncAction<WorkspaceData, Array<string>>(
    'editWorkspacePopupAtom.opened',
    async (payload, store) => {
        return dispatchAsyncAction(store, loadInvitedUsers, payload.id)
            .then((users) => Promise.resolve(users))
    }
)
const close = declareAction('editWorkspacePopupAtom.close')
const [openedAtom, setOpenedAtom] = declareAtomWithSetter('editWorkspacePopupAtom.close', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(editWorkspace.done, () => false),
    on(editWorkspace.fail, () => false),
    on(deleteWorkspace.done, () => false),
    on(deleteWorkspace.fail, () => false),
])

const addInvitedUsers = declareAction<Array<string>>('editWorkspacePopupAtom.addInvitedUsers')
const removeInvitedUser = declareAction<string>('editWorkspacePopupAtom.removeInvitedUser')
const invitedUsersAtom = declareAtom('editWorkspacePopupAtom.invitedUsers', new Set<string>(), on => [
    on(open.done, (_, users) => new Set<string>(users)),
    on(addInvitedUsers, (state, userIds) => addToSet(state, userIds)),
    on(removeInvitedUser, (state, userId) => removeFromSet(state, [userId]))
])

const workspaceIdAtom = declareAtom(
    ['editWorkspacePopupAtom.workspaceId'],
    '',
    on => [
        on(open, (_, {id}) => id),
    ]
)

const [workspaceNameAtom, setWorkspaceName] = declareAtomWithSetter(
    'editWorkspacePopupAtom.workspaceName',
    '',
        on => [
            on(open, (_, {name}) => name),
    ]
)

const submit = declareAction('editWorkspacePopupAtom.submit', (_, store) => {
    const {
        invitedUsers,
        workspaceId,
        workspaceName,
    } = store.getState(editWorkspacePopupAtom)
    store.dispatch(editWorkspace({
        id: workspaceId,
        name: workspaceName,
        invitedUsersIds: Array.from(invitedUsers),
    }))
})

const remove = declareAction('editWorkspacePopupAtom.remove', (_, store) => {
    const {workspaceId} = store.getState(editWorkspacePopupAtom)
    store.dispatch(deleteWorkspace(workspaceId))
})

const [isPopupLoadingAtom, setIsPopupLoading] = declareAtomWithSetter('editWorkspacePopupAtom.popupLoading', false, on => [
    on(open, () => true),
    on(open.done, () => false),
    on(open.fail, () => false),
    on(editWorkspace, () => true),
    on(editWorkspace.done, () => false),
    on(editWorkspace.fail, () => false),
    on(deleteWorkspace, () => true),
    on(deleteWorkspace.done, () => false),
    on(deleteWorkspace.fail, () => false),
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


const editWorkspacePopupAtom = combine({
    workspaceName: workspaceNameAtom,
    invitedUsers: invitedUsersAtom,
    workspaceId: workspaceIdAtom,
    opened: openedAtom,
    isPopupLoading: isPopupLoadingAtom,
    submitButtonState: submitButtonStateAtom,
})

const editWorkspacePopupActions = {
    open,
    close,
    submit,
    remove,
    setOpenedAtom,
    setWorkspaceName,
    addInvitedUsers,
    removeInvitedUser,
    setIsPopupLoading,
}

export {
    editWorkspacePopupAtom,
    editWorkspacePopupActions,
}