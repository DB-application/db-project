import styles from './LanguagePage.module.css'
import {SettingBlock} from "../common/SettingBlock";
import {SelectListItemProps, SelectWithDropdown} from "../../../../common/selectList/SelectWithDropdown";
import {changeLanguage, getLanguage} from "../../../../i18n/language";

function LanguageBlock() {
    const selectedLanguage = getLanguage()

    const items: Array<SelectListItemProps> = [
        {
            id: 'ru',
            text: 'Русский',
            onClick: () => changeLanguage('ru'),
        },
        {
            id: 'en',
            text: 'English',
            onClick: () => changeLanguage('en'),
        },
    ]

    return (
        <SettingBlock
            title={'Язык'}
            description={'Change the language used in the user interface.'}
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