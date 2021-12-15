import styles from './TitleEditor.module.css'
import {useRef, useState} from "react";
import {verify} from "../../../../core/verify";
import {getStylesWithMods} from "../../../../core/styles/getStylesWithMods";
import { joinClassNames } from '../../../../core/styles/joinClassNames';


type TitleEditorProps = {
    value: string,
    onBlur: (value: string) => void,
    className?: string,
    readonly?: boolean,
}

function TitleEditor({
    onBlur,
    readonly,
    className,
    value,
}: TitleEditorProps) {
    const [inputValue, setInputValue] = useState<string>(value)
    const ref = useRef<HTMLInputElement|null>(null)

    function _onInput() {
        setInputValue(verify(ref.current).value)
    }

    function _onBlur() {
        if (!verify(ref.current).value) {
            setInputValue(value)
            return
        }
        !readonly && onBlur(verify(ref.current).value)
    }

    const inputStyles = getStylesWithMods(styles.input, {
        [styles.inputReadonly]: !!readonly,
    })

    return(
        <div
            className={joinClassNames(styles.fieldContainer, className)}
        >
            <input
                ref={ref}
                type={'text'}
                className={inputStyles}
                onInput={_onInput}
                onBlur={_onBlur}
                value={inputValue}
                disabled={readonly}
            />
        </div>
    )
}

export {
    TitleEditor,
}