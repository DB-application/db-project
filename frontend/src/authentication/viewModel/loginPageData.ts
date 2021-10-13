import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {loginAction} from "./actions/loginAction";
import {LoginErrorType, PasswordErrorType} from "./field/FieldErrorTypes";


const setLogin = declareAction<string>()
const loginAtom = declareAtom<string>('', on => [
    on(setLogin, (_, login) => login),
])

const setLoginError = declareAction<LoginErrorType|null>()
const loginErrorAtom = declareAtom<LoginErrorType|null>(null, on => [
    on(setLoginError, (_, value) => value),
    on(setLogin, () => null),
])

const setPassword = declareAction<string>()
const passwordAtom = declareAtom<string>('', on => [
    on(setPassword, (_, password) => password),
])

const setPasswordError = declareAction<PasswordErrorType|null>()
const passwordErrorAtom = declareAtom<PasswordErrorType|null>(null, on => [
    on(setPasswordError, (_, value) => value),
    on(setPassword, () => null),
])

const setRememberMe = declareAction<boolean>()
const rememberMeAtom  = declareAtom<boolean>(false, on => [
    on(setRememberMe, (_, value) => value)
])

const submitLogin = declareAction(
    (_, store) => {
        const {
            password,
            login,
            loginError,
            passwordError,
        } = store.getState(loginPageDataAtom)
        if (!loginError && !passwordError) {
            store.dispatch(loginAction({
                login,
                password,
            }))
        }
    }
)

const setIsLoading = declareAction<boolean>()
const isLoadingAtom = declareAtom<boolean>(false, on => [
    on(loginAction, () => true),
    on(setIsLoading, (_, value) => value),
])

const submitButtonStateAtom = map(
    combine({
        loginError: loginErrorAtom,
        passwordError: passwordErrorAtom,
        isLoading: isLoadingAtom,
    }),
    ({loginError, passwordError, isLoading}) => {
        return isLoading
            ? 'preloader'
            : !!loginError || !!passwordError
                ? 'disabled'
                : 'normal'
    }
)

const loginPageDataAtom = combine({
    password: passwordAtom,
    login: loginAtom,
    loginError: loginErrorAtom,
    passwordError: passwordErrorAtom,
    rememberMe: rememberMeAtom,
    submitButtonState: submitButtonStateAtom,
})

const loginPageActions = {
    setLogin,
    setLoginError,
    setPassword,
    setPasswordError,
    submitLogin,
    setIsLoading,
    setRememberMe,
}

export {
    loginPageDataAtom,
    loginPageActions,
}