import {declareAsyncAction} from "../core/reatom/declareAsyncAction";
import {UserData} from "../common/UserData";
import {UsersApi} from "../api/usersApi";
import {processStandardError} from "../core/error/processStandardError";
import {usersActions, usersAtom} from "./usersAtom";
import {declareAtomWithSetter} from "../core/reatom/declareAtomWithSetter";
import { Store } from "@reatom/core";
import {dispatchAsyncAction} from "../core/reatom/dispatchAsyncAction";


function loadUsersResponseCall(store: Store, userIds: Array<string>) {
    return UsersApi.getUsersData(userIds)
        .then(usersData => {
            store.dispatch(usersActions.updateUsers(usersData))
            return Promise.resolve(usersData)
        })
        .catch(() => {
            processStandardError()
            return Promise.reject()
        })
}

const loadUsers = declareAsyncAction<Array<string>, Array<UserData>>('loadUsers',
    (userIds, store) => {
        return loadUsersResponseCall(store, userIds)
    }
)

const loadAbsentUsers = declareAsyncAction<Array<string>, Array<UserData>>('loadAbsentUsers',
    (userIds, store) => {
        const users = store.getState(usersAtom)
        const absentUserId = userIds.filter(userId => !users[userId])
        if (absentUserId.length > 0) {
            return dispatchAsyncAction(store, loadUsers, absentUserId)
        }
        return Promise.resolve([])
    }
)

const [usersLoadingAtom, setUsersLoading] = declareAtomWithSetter('usersLoading', false, on => [
    on(loadUsers, () => true),
    on(loadUsers.done, () => false),
    on(loadUsers.fail, () => false),
])

export {
    loadUsers,
    usersLoadingAtom,
    loadAbsentUsers,
}