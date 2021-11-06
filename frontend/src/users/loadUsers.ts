import {declareAsyncAction} from "../core/reatom/declareAsyncAction";
import {UserData} from "../common/UserData";
import {UsersApi} from "../api/usersApi";
import {processStandardError} from "../core/error/processStandardError";


const loadUsers = declareAsyncAction<Array<string>, Array<UserData>>('loadUsers',
    (userIds, store) => {

        return UsersApi.getUsersData(userIds)
            .then(usersData => {
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