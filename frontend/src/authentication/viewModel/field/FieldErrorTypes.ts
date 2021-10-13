type EmailErrorType = 'invalid_format' | 'empty' | 'taken'
type PasswordErrorType = 'invalid_format' | 'empty' | 'wrong_password' | 'too_easy'
type NicknameErrorType = 'invalid_format' | 'empty' | 'taken'
type LoginErrorType = 'invalid_format' | 'empty' | 'unknown_login'

type FormFieldErrorType = EmailErrorType | PasswordErrorType | NicknameErrorType | LoginErrorType

export type {
    NicknameErrorType,
    PasswordErrorType,
    EmailErrorType,
    FormFieldErrorType,
    LoginErrorType,
}