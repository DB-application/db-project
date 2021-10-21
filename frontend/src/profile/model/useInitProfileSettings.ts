import {userAtom} from "../../authentication/viewModel/userAtom";
import {profileSettingsActions} from "./profileSettings";
import {useAction, useAtom} from "@reatom/react";
import {useLayoutEffect} from "react";

function useInitProfileSettings() {
    const userInfo = useAtom(userAtom)
    const handleSetNickName = useAction(profileSettingsActions.setNickname)
    const handleSetFirstname = useAction(profileSettingsActions.setFirstName)
    const handleSetLastname = useAction(profileSettingsActions.setLastName)
    const handleSetEmail = useAction(profileSettingsActions.setEmail)
    const handleSetPhoneNumber = useAction(profileSettingsActions.setPhoneNumber)

    useLayoutEffect(() => {
        if (userInfo.isAuthUser) {
            handleSetNickName(userInfo.username)
            handleSetEmail(userInfo.email)
            handleSetFirstname(userInfo.firstName)
            handleSetLastname(userInfo.lastName)
            handleSetPhoneNumber(userInfo.phone)
        }
    }, [handleSetPhoneNumber,handleSetFirstname,handleSetLastname,handleSetEmail,handleSetNickName,userInfo])
}

export {
    useInitProfileSettings,
}