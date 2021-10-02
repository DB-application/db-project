import { declareAction, declareAtom } from '@reatom/core'
import {UserModel} from './UserModel';

const userMockData: UserModel = {
    isAuthUser: false,
};

const setUserDataAction = declareAction<UserModel>()
const setEmailAction = declareAction<string>()
const setFirstnameAction = declareAction<string>()
const setLastnameAction = declareAction<string>()

const userAtom = declareAtom<UserModel>(userMockData, (on) => [
    on(setUserDataAction, (_, payload) => payload),
    on(setEmailAction, (state, email) => ({...state, email})),
    on(setFirstnameAction, (state, firstname) => ({...state, firstname})),
    on(setLastnameAction, (state, lastname) => ({...state, lastname})),
]);

const userActions = {
    setUserDataAction,
    setEmailAction,
    setFirstnameAction,
    setLastnameAction,
}

export { userActions, userAtom };