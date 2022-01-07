import {combine} from "@reatom/core";
import {profileSettingsAtom} from "./profileSettings";
import {passwordSettingsAtom} from "./passwordSettings";


const userProfileAtom = combine({
    profileSettings: profileSettingsAtom,
    passwordSettings: passwordSettingsAtom,
})

export {
    userProfileAtom,
}