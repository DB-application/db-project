import {
    EmailErrorType,
    LoginErrorType,
    NicknameErrorType,
    PasswordErrorType
} from "../../viewModel/field/FieldErrorTypes";
import {I18n_get} from "../../../i18n/i18n_get";


function getEmailErrorText(emailError: EmailErrorType): string | null {
    switch (emailError) {
        case 'invalid_format':
            return I18n_get('LoginForm.EmailInvalidFormat')
        case 'empty':
            return I18n_get('LoginForm.EmailRequired')
        case "taken":
            return I18n_get('LoginForm.EmailExist')
        default:
            return null
    }
}

function getLoginErrorText(loginError: LoginErrorType): string | null {
    switch (loginError) {
        case 'invalid_format':
            return I18n_get('LoginForm.EmailInvalidFormat')
        case 'empty':
            return I18n_get('LoginForm.EmailRequired')
        case "unknown_login":
            return I18n_get('LoginForm.UnknownEmail')
    }
}

function getPasswordErrorText(passwordError: PasswordErrorType): string | null {
    switch (passwordError) {
        case 'invalid_format':
            return I18n_get('LoginForm.PasswordInvalidFormat')
        case 'empty':
            return I18n_get('LoginForm.PasswordRequired')
        case "wrong_password":
            return I18n_get('LoginForm.WrongPassword')
        case "too_easy":
            return I18n_get('LoginForm.TooEasyPassword')
        default:
            return null
    }
}

function getNicknameErrorText(passwordError: NicknameErrorType): string | null {
    switch (passwordError) {
        case 'invalid_format':
            return I18n_get('LoginForm.NicknameInvalidFormat')
        case 'empty':
            return I18n_get('LoginForm.NicknameRequired')
        case "taken":
            return I18n_get('LoginForm.NicknameExist')
        default:
            return null
    }
}

export {
    getNicknameErrorText,
    getPasswordErrorText,
    getEmailErrorText,
    getLoginErrorText,
}