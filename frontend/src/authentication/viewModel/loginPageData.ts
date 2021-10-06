import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {loginAction} from "./loginAction";
import {registrationAction} from "./registrationAction";
import {isValidEmail, isValidNickname, isValidPassword} from "../view/common/validation";

type EmailErrorType = 'invalid_format' | 'empty' | 'taken' | 'unknown_email'
type PasswordErrorType = 'invalid_format' | 'empty' | 'wrong_password' | 'too_easy'
type NicknameErrorType = 'invalid_format' | 'empty' | 'taken'

type FormFieldErrorType = EmailErrorType | PasswordErrorType | NicknameErrorType

type LoginFormMode = 'login' | 'registration'

const gotoLogin = declareAction()
const gotoRegistration = declareAction()

const loginFormModeAtom = declareAtom<LoginFormMode>('login', on => [
    on(gotoLogin, () => 'login'),
    on(gotoRegistration, () => 'registration'),
])

const setEmail = declareAction<string>()
const emailAtom = declareAtom<string>('', on => [
    on(setEmail, (_, email) => email),
    on(loginFormModeAtom, () => ''),
])

const setEmailError = declareAction<EmailErrorType|null>()
const emailErrorAtom = declareAtom<EmailErrorType|null>(null, on => [
    on(setEmailError, (_, value) => value),
    on(setEmail, () => null),
    on(loginFormModeAtom, () => null),
])

const setPassword = declareAction<string>()
const passwordAtom = declareAtom<string>('', on => [
    on(setPassword, (_, password) => password),
    on(loginFormModeAtom, () => ''),
])

const setPasswordError = declareAction<PasswordErrorType|null>()
const passwordErrorAtom = declareAtom<PasswordErrorType|null>(null, on => [
    on(setPasswordError, (_, value) => value),
    on(setPassword, () => null),
    on(loginFormModeAtom, () => null),
])

const setNickName = declareAction<string>()
const nicknameAtom = declareAtom<string>('', on => [
    on(setNickName, (_, value) => value),
    on(loginFormModeAtom, () => ''),
])

const setNicknameError = declareAction<NicknameErrorType|null>()
const nicknameErrorAtom = declareAtom<NicknameErrorType|null>(null, on => [
    on(setNicknameError, (_, value) => value),
    on(setNickName, () => null),
    on(loginFormModeAtom, () => null),
])

const setShowPassword = declareAction<boolean>()
const showPasswordAtom = declareAtom<boolean>(false, on => [
    on(setShowPassword, (_, value) => value),
])

const submitForm = declareAction(
    (_, store) => {
        const {
            mode,
            password,
            email,
            emailError,
            nickname,
            nicknameError,
            passwordError,
        } = store.getState(loginPageDataAtom)
        store.dispatch(setEmailError(isValidEmail(email)))
        store.dispatch(setNicknameError(isValidNickname(nickname)))
        store.dispatch(setPasswordError(isValidPassword(password)))
        if (!emailError && !nicknameError && !passwordError) {
            if (mode === 'login') {
                store.dispatch(loginAction({
                    login: email,
                    password,
                }))
            }
            else {
                store.dispatch(registrationAction({
                    nickname,
                    email,
                    password,
                }))
            }
        }
    }
)

const isLoadingAtom = declareAtom<boolean>(false, on => [
    on(loginAction, () => true),
    on(registrationAction, () => true),
])

const submitButtonStateAtom = map(
    combine({
        emailError: emailErrorAtom,
        nicknameError: nicknameErrorAtom,
        passwordError: passwordErrorAtom,
        isLoading: isLoadingAtom,
    }),
    ({emailError, nicknameError, passwordError, isLoading}) => {
        return isLoading
            ? 'preloader'
            : !!emailError || !!nicknameError || !!passwordError
                ? 'disabled'
                : 'normal'
    }
)

const loginPageDataAtom = combine({
    mode: loginFormModeAtom,
    email: emailAtom,
    password: passwordAtom,
    showPassword: showPasswordAtom,
    nickname: nicknameAtom,
    emailError: emailErrorAtom,
    passwordError: passwordErrorAtom,
    nicknameError: nicknameErrorAtom,
    submitButtonState: submitButtonStateAtom,
})

const loginPageActions = {
    gotoLogin,
    gotoRegistration,
    setEmail,
    setPassword,
    setPasswordError,
    setShowPassword,
    setEmailError,
    setNickName,
    setNicknameError,
    submitForm,
}

export {
    loginPageDataAtom,
    loginPageActions,
}

export type {
    FormFieldErrorType,
    EmailErrorType,
    PasswordErrorType,
    NicknameErrorType,
}