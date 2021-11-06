import {declareAction, declareAtom} from "@reatom/core";
import {UserData} from "../common/UserData";
import {loadUsers} from "./loadUsers";

type UsersMap = {
    [item: string]: UserData,
}

const removeUser = declareAction<string>()
const updateUser = declareAction<UserData>()
const initUsers = declareAction<Array<UserData>>()

const usersAtom = declareAtom<UsersMap>('usersAtom', {}, on => [
    on(loadUsers.done, (state, users) => {
        const newUsers = {...state}
        users.forEach(user => newUsers[user.id] = user)
        return newUsers
    }),
    on(updateUser, (state, user) => ({
        ...state,
        [user.id]: user,
    })),
    on(removeUser, (state, eventId) => {
        const newUsers = {
            ...state,
        }
        delete newUsers[eventId]
        return newUsers
    }),
])

const usersActions = {
    removeUser,
    updateUser,
    initUsers,
}

export {
    usersAtom,
    usersActions,
}

export type {
    UsersMap,
}