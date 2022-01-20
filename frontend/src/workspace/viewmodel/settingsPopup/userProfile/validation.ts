import {PasswordErrorType} from "./PasswordErrorType";
import {checkPasswordComplexity, checkPasswordFormat} from "../../../../common/validate/checkPassword";


function validateOldPassword(password: string): PasswordErrorType|null {
    if (!password) {
        return 'empty'
    }
    if (!checkPasswordFormat(password)) {
        return "invalid_format"
    }
    return null
}

function validateNewPassword(password: string): PasswordErrorType|null {
    if (!password) {
        return 'empty'
    }
    if (!checkPasswordFormat(password)) {
        return "invalid_format"
    }
    if (!checkPasswordComplexity(password)) {
        return "too_easy"
    }
    return null
}

function validateConfirmPassword(password: string): PasswordErrorType|null {
    if (!password) {
        return 'empty'
    }
    if (!checkPasswordFormat(password)) {
        return "invalid_format"
    }
    return null
}

export {
    validateOldPassword,
    validateNewPassword,
    validateConfirmPassword,
}