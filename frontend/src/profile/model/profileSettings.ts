import {combine, declareAction, declareAtom} from "@reatom/core";
import {Button_State_Type} from "../../common/button/Button_Base";
import {I18n_get} from "../../i18n/i18n_get";
import {toast} from "react-toastify";
import {setUserInfo} from "../../user/setUserData";


const setFirstName = declareAction<string>()
const firstNameAtom = declareAtom('profileSettings.firstName', '', on =>[
    on(setFirstName, (_, value) => value),
])

const setLastName = declareAction<string>()
const lastNameAtom = declareAtom('profileSettings.lastName', '', on =>[
    on(setLastName, (_, value) => value),
])

const setEmail = declareAction<string>()
const emailAtom = declareAtom('profileSettings.email', '', on =>[
    on(setEmail, (_, value) => value),
])

const setNickname = declareAction<string>()
const nicknameAtom = declareAtom('profileSettings.nickname', '', on =>[
    on(setNickname, (_, value) => value),
])

const setPhoneNumber = declareAction<string>()
const phoneNumberAtom = declareAtom('profileSettings.phone', '', on => [
    on(setPhoneNumber, (_, value) => value),
])

const setSaveProfileInfoState = declareAction<Button_State_Type>()
const saveProfileInfoStateAtom = declareAtom<Button_State_Type>('profileSettings.saveButtonState', 'normal', on => [
    on(setSaveProfileInfoState, (_, value) => value),
])

const saveProfileInfo = declareAction(
    (_, store) => {
        const {
            firstName,
            nickname,
            email,
            phoneNumber,
            lastName,
        } = store.getState(profileSettingsAtom)
        store.dispatch(setSaveProfileInfoState('preloader'))
        setUserInfo(store, {
            firstName,
            lastName,
            phoneNumber,
            email,
            nickname,
        })
            .then(() => {
                toast.success(I18n_get("ProfileSettings.InfoSuccessUpdate"))
                store.dispatch(setSaveProfileInfoState('normal'))
            })
            .catch(() => {
                store.dispatch(setSaveProfileInfoState('normal'))
            })
    }
)



const profileSettingsAtom = combine({
    firstName: firstNameAtom,
    lastName: lastNameAtom,
    email: emailAtom,
    nickname: nicknameAtom,
    phoneNumber: phoneNumberAtom,
    saveProfileInfoState: saveProfileInfoStateAtom,
})

const profileSettingsActions = {
    setFirstName,
    setLastName,
    setEmail,
    setNickname,
    setPhoneNumber,
    saveProfileInfo,
}

export {
    profileSettingsAtom,
    profileSettingsActions,
}