type EmailErrorType = 'invalid_format' | 'empty' | 'taken' | 'unknown_email'
type PasswordErrorType = 'invalid_format' | 'empty' | 'wrong_password' | 'too_easy'
type NicknameErrorType = 'invalid_format' | 'empty' | 'taken'

type FormFieldErrorType = EmailErrorType | PasswordErrorType | NicknameErrorType

export type {
    NicknameErrorType,
    PasswordErrorType,
    EmailErrorType,
    FormFieldErrorType,
}