import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {userProfileAtom} from "./userProfile/userProfile";

type SettingsPopupPageType = 'profile' | 'language' | 'calendar'


const open = declareAction<SettingsPopupPageType>('settingsPopup.open')
const close = declareAction('settingsPopup.close')
const openedAtom = declareAtom(
    'settingsPopup.opened',
    false,
    on => [
        on(open, () => true),
        on(close, () => false),
    ]
)

const [activePageAtom, setActivePage] = declareAtomWithSetter<SettingsPopupPageType>(
    'settingsPopup.activePage',
    'profile',
    on => [
        on(open, (_, value) => value),
    ]
)

const [isLoadingAtom, setIsLoading] = declareAtomWithSetter(
    'settingsPopup.isLoading',
    false,
)

const settingsPopupAtom = combine({
    activePage: activePageAtom,
    isLoading: isLoadingAtom,
    opened: openedAtom,
    userProfile: userProfileAtom,
})

const settingsPopupActions = {
    open,
    close,
    setActivePage,
    setIsLoading,
}

export type {
    SettingsPopupPageType,
}

export {
    settingsPopupAtom,
    settingsPopupActions,
}