import { I18n_get } from "../../../../i18n/i18n_get";
import {PasswordErrorType} from "./PasswordErrorType";


function getPasswordErrorText(error: PasswordErrorType|null): string|undefined {
    if (!error) {
        return undefined
    }
    switch (error) {
        case "invalid_format":
            return I18n_get('Common.PasswordInvalidFormat')
        case "empty":
            return I18n_get('Common.PasswordRequired')
        case "too_easy":
            return I18n_get('Common.TooEasyPassword')
        case "confirm_password_mismatch":
            return I18n_get('Common.PasswordIsDifferent')
        case "new_password_same":
            return I18n_get('Common.PasswordMustBeDifferent')
        case "wrong_old_password":
            return I18n_get('Common.OldPasswordIsIncorrect')
        default:
            throw new Error(`unknown error type ${error}`)
    }
}

export {
    getPasswordErrorText,
}