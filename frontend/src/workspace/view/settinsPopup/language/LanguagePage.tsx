import styles from './LanguagePage.module.css'
import {SettingBlock} from "../common/SettingBlock";
import {SelectListItemProps, SelectWithDropdown} from "../../../../common/selectList/SelectWithDropdown";
import {changeLanguage} from "../../../../i18n/language";
import {I18n_get} from "../../../../i18n/i18n_get";
import {PageHeader} from "../common/PageHeader";
import {useAction, useAtom} from "@reatom/react";
import {languageAtom, setLanguage} from "../../../../appLayout/language";
import {calendarSettingsAction, calendarSettingsAtom} from "../../../viewmodel/calendar/calendarSettings";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import { Toggle } from '../../../../common/toggle/Toggle';

function LanguageBlock() {
    const selectedLanguage = useAtom(languageAtom)
    const handleSetSelectedLanguage = useAction(setLanguage)

    const items: Array<SelectListItemProps> = [
        {
            id: 'ru',
            text: 'Русский',
            onClick: () => {
                changeLanguage('ru')
                handleSetSelectedLanguage('ru')
            },
        },
        {
            id: 'en',
            text: 'English',
            onClick: () => {
                changeLanguage('en')
                handleSetSelectedLanguage('en')
            },
        },
    ]

    return (
        <SettingBlock
            title={I18n_get('SettingsPopup.LanguageTitle')}
            description={I18n_get('SettingsPopup.LanguageDescription')}
            binding={<SelectWithDropdown
                items={items}
                selected={selectedLanguage}
            />}
            className={styles.settingBlock}
        />
    )
}

function StartOnMondayBlock() {
    const startOnMonday = useAtomWithSelector(calendarSettingsAtom, x => x.startOnMonday)
    const handleSetStartOnMonday = useAction(calendarSettingsAction.setStartOnMonday)
    return (
        <SettingBlock
            title={I18n_get('SettingsPopup.StartWeekTitle')}
            description={I18n_get('SettingsPopup.StartWeekDescription')}
            binding={<Toggle
                checked={startOnMonday}
                onCheckedChange={(checked) => handleSetStartOnMonday(checked)}
            />}
            className={styles.settingBlock}
        />
    )
}

function LanguagePage() {

    return (
        <>
            <PageHeader
                title={I18n_get('SettingsPopup.Calendar')}
            />
            <LanguageBlock/>
            <StartOnMondayBlock/>
        </>
    )
}

export {
    LanguagePage,
}