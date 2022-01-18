import {combine, declareAction, map} from "@reatom/core";
import {EmailErrorType, NicknameErrorType, PasswordErrorType} from "./field/FieldErrorTypes";
import {registrationAction} from "./actions/registrationAction";
import {declareAtomWithSetter} from "../../core/reatom/declareAtomWithSetter";

const [emailAtom, setEmail] = declareAtomWithSetter<string>('registration.email', '')

const [emailErrorAtom, setEmailError] = declareAtomWithSetter<EmailErrorType|null>('registration.emailError' , null, on => [
    on(setEmail, () => null),
])

const [passwordAtom, setPassword] = declareAtomWithSetter<string>('registration.password', '')

const [passwordErrorAtom, setPasswordError] = declareAtomWithSetter<PasswordErrorType|null>('registration.passwordError', null, on => [
    on(setPassword, () => null),
])

const [nicknameAtom, setNickName] = declareAtomWithSetter<string>('registration.nickname', '')

const [nicknameErrorAtom, setNicknameError] = declareAtomWithSetter<NicknameErrorType|null>('registration.nicknameError',null, on => [
    on(setNickName, () => null),
])

const [isLoadingAtom, setIsLoading] = declareAtomWithSetter<boolean>('registration.isLoading', false, on => [
    on(registrationAction, () => true),
])

const submitButtonStateAtom = map(
    combine({
        emailError: emailErrorAtom,
        nicknameError: nicknameErrorAtom,
        passwordError: passwordErrorAtom,
        email: emailAtom,
        password: passwordAtom,
        nickname: nicknameAtom,
        isLoading: isLoadingAtom,
    }),
    ({emailError, nicknameError, passwordError, nickname, email, password, isLoading}) => {
        return isLoading
            ? 'preloader'
            : !!emailError || !!nicknameError || !!passwordError || !nickname || !email || !password
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