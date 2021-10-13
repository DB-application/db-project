import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {EmailErrorType, NicknameErrorType, PasswordErrorType} from "./field/FieldErrorTypes";
import {registrationAction} from "./actions/registrationAction";

const setEmail = declareAction<string>()
const emailAtom = declareAtom<string>('', on => [
    on(setEmail, (_, email) => email),
])

const setEmailError = declareAction<EmailErrorType|null>()
const emailErrorAtom = declareAtom<EmailErrorType|null>(null, on => [
    on(setEmailError, (_, value) => value),
    on(setEmail, () => null),
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

const setNickName = declareAction<string>()
const nicknameAtom = declareAtom<string>('', on => [
    on(setNickName, (_, value) => value),
])

const setNicknameError = declareAction<NicknameErrorType|null>()
const nicknameErrorAtom = declareAtom<NicknameErrorType|null>(null, on => [
    on(setNicknameError, (_, value) => value),
    on(setNickName, () => null),
])

const setIsLoading = declareAction<boolean>()
const isLoadingAtom = declareAtom<boolean>(false, on => [
    on(registrationAction, () => true),
    on(setIsLoading, (_, value) => value),
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

const submitRegistrationForm = declareAction(
    (_, store) => {
        const {
            password,
            email,
            emailError,
            nicknameError,
            nickname,
            passwordError,
        } = store.getState(registrationPageAtom)
        if (!emailError && !nicknameError && !passwordError) {
            store.dispatch(registrationAction({
                nickname,
                email,
                password,
            }))
        }
    }
)

const registrationPageAtom = combine({
    email: emailAtom,
    password: passwordAtom,
    nickname: nicknameAtom,
    emailError: emailErrorAtom,
    passwordError: passwordErrorAtom,
    nicknameError: nicknameErrorAtom,
    submitButtonState: submitButtonStateAtom,
})

const registrationPageAction = {
    setEmail,
    setPasswordError,
    setEmailError,
    setPassword,
    setNickName,
    setNicknameError,
    setIsLoading,
    submitRegistrationForm,
}

export {
    registrationPageAction,
    registrationPageAtom,
}