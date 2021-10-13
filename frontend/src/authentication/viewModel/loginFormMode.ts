import {combine, declareAction, declareAtom} from "@reatom/core";

type LoginFormMode = 'login' | 'registration'

const gotoLogin = declareAction()
const gotoRegistration = declareAction()

const formModeAtom = declareAtom<LoginFormMode>('login', on => [
    on(gotoLogin, () => 'login'),
    on(gotoRegistration, () => 'registration'),
])

const loginFormAtom = combine({
    mode: formModeAtom,
})

const loginFormActions = {
    gotoLogin,
    gotoRegistration,
}

export {
    loginFormAtom,
    loginFormActions,
}

export type {
    LoginFormMode,
}