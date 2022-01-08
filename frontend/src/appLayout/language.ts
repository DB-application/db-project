import {declareAtomWithSetter} from "../core/reatom/declareAtomWithSetter";
import {getLanguage, LanguageType} from "../i18n/language";


const [languageAtom, setLanguage] = declareAtomWithSetter<LanguageType>('app.languageAtom', getLanguage())

export {
    languageAtom,
    setLanguage,
}