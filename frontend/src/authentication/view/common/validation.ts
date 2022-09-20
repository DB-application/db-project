import { checkEmailFormat } from "../../../common/validate/checkEmail";
import {checkPasswordComplexity, checkPasswordFormat } from "../../../common/validate/checkPassword";
import {
    EmailErrorType,
    LoginErrorType,
    NicknameErrorType,
    PasswordErrorType
} from "../../viewModel/field/FieldErrorTypes";



function isValidEmail(email: string): EmailErrorType|null {
    if (!email) {
        return 'empty'
    }
    if (!checkEmailFormat(email)) {
        return 'invalid_format'
    }
    return null
}

function isValidLogin(login: string): LoginErrorType|null {
    if (!login) {
        return 'empty'
    }
    return null
}

function isValidPassword(password: string): PasswordErrorType|null {
    if (!password) {
        return 'empty'
    }
    if (!checkPasswordFormat(password)) {
        return 'invalid_format'
    }
    // if (!checkPasswordComplexity(password)) {
    //     return 'too_easy'
    // }
    return null
}

function isValidNickname(nickname: string): NicknameErrorType|null {
    if (!nickname) {
        return 'empty'
    }
    return null
}

export {
    isValidEmail,
    isValidPassword,
    isValidNickname,
    isValidLogin,
}