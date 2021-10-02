import {TFunction} from "react-i18next";
import {EmailErrorType, NicknameErrorType, PasswordErrorType} from "../../viewModel/loginPageData";


function getEmailErrorText(t: TFunction, emailError: EmailErrorType): string | null {
    switch (emailError) {
        case 'invalid_format':
            return t('LoginForm.EmailInvalidFormat')
        case 'empty':
            return t('LoginForm.EmailRequired')
        case "taken":
            return t('LoginForm.EmailExist')
        case "unknown_email":
            return t('LoginForm.UnknownEmail')
        default:
            return null
    }
}

function getPasswordErrorText(t: TFunction, passwordError: PasswordErrorType): string | null {
    switch (passwordError) {
        case 'invalid_format':
            return t('LoginForm.PasswordInvalidFormat')
        case 'empty':
            return t('LoginForm.PasswordRequired')
        case "wrong_password":
            return t('LoginForm.WrongPassword')
        case "too_easy":
            return t('LoginForm.TooEasyPassword')
        default:
            return null
    }
}

function getNicknameErrorText(t: TFunction, passwordError: NicknameErrorType): string | null {
    switch (passwordError) {
        case 'invalid_format':
            return t('LoginForm.NicknameInvalidFormat')
        case 'empty':
            return t('LoginForm.NicknameRequired')
        case "taken":
            return t('LoginForm.NicknameExist')
        default:
            return null
    }
}

export {
    getNicknameErrorText,
    getPasswordErrorText,
    getEmailErrorText,
}