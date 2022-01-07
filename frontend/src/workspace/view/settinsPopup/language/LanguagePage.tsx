import styles from './LanguagePage.module.css'
import {SettingBlock} from "../common/SettingBlock";
import {SelectListItemProps, SelectWithDropdown} from "../../../../common/selectList/SelectWithDropdown";
import {changeLanguage, getLanguage, LanguageType} from "../../../../i18n/language";
import {I18n_get} from "../../../../i18n/i18n_get";
import {useState} from "react";

function LanguageBlock() {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(getLanguage())

    const items: Array<SelectListItemProps> = [
        {
            id: 'ru',
            text: 'Русский',
            onClick: () => {
                changeLanguage('ru')
                setSelectedLanguage('ru')
            },
        },
        {
            id: 'en',
            text: 'English',
            onClick: () => {
                changeLanguage('en')
                setSelectedLanguage('en')
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

function LanguagePage() {

    return (
        <>
            <LanguageBlock/>
        </>
    )
}

export {
    LanguagePage,
}