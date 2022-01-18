import {combine, declareAction, map} from "@reatom/core";
import {loginAction} from "./actions/loginAction";
import {LoginErrorType, PasswordErrorType} from "./field/FieldErrorTypes";
import {declareAtomWithSetter} from "../../core/reatom/declareAtomWithSetter";


const [loginAtom, setLogin] = declareAtomWithSetter<string>('loginPage.login', '')

const [loginErrorAtom, setLoginError] = declareAtomWithSetter<LoginErrorType|null>('loginPage.loginErrorAtom', null, on => [
    on(setLogin, () => null),
])

const [passwordAtom, setPassword] = declareAtomWithSetter<string>('loginPage.password', '')

const [passwordErrorAtom, setPasswordError] = declareAtomWithSetter<PasswordErrorType|null>('loginPage.passwordError', null, on => [
    on(setPassword, () => null),
])

const [rememberMeAtom, setRememberMe]  = declareAtomWithSetter<boolean>('loginPage.rememberMe', false)

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

const [isLoadingAtom, setIsLoading] = declareAtomWithSetter<boolean>('loginPage.isLoadingAtom', false, on => [
    on(loginAction, () => true),
])

const submitButtonStateAtom = map(
    combine({
        loginError: loginErrorAtom,
        passwordError: passwordErrorAtom,
        login: loginAtom,
        password: passwordAtom,
        isLoading: isLoadingAtom,
    }),
    ({loginError, passwordError, login, password, isLoading}) => {
        return isLoading
            ? 'preloader'
            : !!loginError || !!passwordError || !login || !password
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