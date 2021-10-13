import {declareAction, declareAtom, map} from '@reatom/core'
import {AuthenticatedUserModel, UserModel} from './UserModel';

const userMockData: UserModel = {
    isAuthUser: false,
};

const setUserData = declareAction<UserModel>()
const setEmail = declareAction<string>()
const setFirstname = declareAction<string>()
const setLastname = declareAction<string>()
const setUserPhone = declareAction<string>()
const setAvatarUrl = declareAction<string>()
const setNickName = declareAction<string>()
const setUserUnauthorized = declareAction()

const userAtom = declareAtom<UserModel>(userMockData, (on) => [
    on(setUserData, (_, payload) => payload),
    on(setEmail, (state, email) => ({...state, email})),
    on(setFirstname, (state, firstname) => ({...state, firstname})),
    on(setLastname, (state, lastname) => ({...state, lastname})),
    on(setUserPhone, (state, phone) => ({...state, phone})),
    on(setAvatarUrl, (state, avatarUrl) => ({...state, avatarUrl})),
    on(setNickName, (state, nickname) => ({...state, nickname})),
    on(setUserUnauthorized, () => ({isAuthUser: false})),
])

const authorizedUser = map(userAtom, (user) => (
    <AuthenticatedUserModel>(user)
))

const userActions = {
    setUserData,
    setEmail,
    setFirstname,
    setLastname,
    setUserPhone,
    setAvatarUrl,
    setNickName,
    setUserUnauthorized,
}

export {
    userActions,
    userAtom,
    authorizedUser,
};