import {EmailErrorType, NicknameErrorType, PasswordErrorType} from "../../viewModel/field/FieldErrorTypes";


function isValidEmail(email: string): EmailErrorType|null {
    if (email === '') {
        return 'empty'
    }
    return null
}

function isValidPassword(password: string): PasswordErrorType|null {
    if (password === '') {
        return 'empty'
    }
    return null
}

function isValidNickname(nickname: string): NicknameErrorType|null {
    if (nickname === '') {
        return 'empty'
    }
    return null
}

export {
    isValidEmail,
    isValidPassword,
    isValidNickname,
}