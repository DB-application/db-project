import {combine, declareAction} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {Button_State_Type} from "../../../../common/button/ButtonBase";
import {setUserInfo} from "../../../../currentUser/setUserData";
import {I18n_get} from "../../../../i18n/i18n_get";
import {toast} from "react-toastify";


const [firstNameAtom, setFirstName] = declareAtomWithSetter('profileSettings.firstName', '')

const [lastNameAtom, setLastName] = declareAtomWithSetter('profileSettings.lastName', '')

const [emailAtom, setEmail] = declareAtomWithSetter('profileSettings.email', '')

const [nicknameAtom, setNickname] = declareAtomWithSetter('profileSettings.nickname', '')

const [phoneNumberAtom, setPhoneNumber] = declareAtomWithSetter('profileSettings.phone', '')

const [saveProfileInfoStateAtom, setSaveProfileInfoState] = declareAtomWithSetter<Button_State_Type>('profileSettings.saveButtonState', 'normal')

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