import {declareAction, map} from '@reatom/core'
import {AuthenticatedUserModel, UserModel} from './UserModel';
import {declareAtomWithSetter} from "../../core/reatom/declareAtomWithSetter";

const userMockData: UserModel = {
    isAuthUser: false,
};

const setEmail = declareAction<string>()
const setFirstname = declareAction<string>()
const setLastname = declareAction<string>()
const setUserPhone = declareAction<string>()
const setAvatarUrl = declareAction<string>()
const setUserName = declareAction<string>()
const setUserUnauthorized = declareAction()

const [currentUserAtom, setCurrentUserData] = declareAtomWithSetter<UserModel>('currentUserAtom', userMockData, (on) => [
    on(setEmail, (state, email) => ({...state, email})),
    on(setFirstname, (state, firstname) => ({...state, firstname})),
    on(setLastname, (state, lastname) => ({...state, lastname})),
    on(setUserPhone, (state, phone) => ({...state, phone})),
    on(setAvatarUrl, (state, avatarUrl) => ({...state, avatarUrl})),
    on(setUserName, (state, username) => ({...state, username})),
    on(setUserUnauthorized, () => ({isAuthUser: false})),
])

const authorizedCurrentUser = map(currentUserAtom, (user) => (
    user as AuthenticatedUserModel
))

const currentUserActions = {
    setCurrentUserData,
    setEmail,
    setFirstname,
    setLastname,
    setUserPhone,
    setAvatarUrl,
    setUserName,
    setUserUnauthorized,
}

export {
    currentUserActions,
    currentUserAtom,
    authorizedCurrentUser,
};