import {declareAsyncAction} from "../core/reatom/declareAsyncAction";
import {UserData} from "../common/UserData";
import {UsersApi} from "../api/usersApi";
import {processStandardError} from "../core/error/processStandardError";
import {usersActions} from "./usersAtom";


const loadUsers = declareAsyncAction<Array<string>, Array<UserData>>('loadUsers',
    (userIds, store) => {

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
)

export {
    loadUsers,
}