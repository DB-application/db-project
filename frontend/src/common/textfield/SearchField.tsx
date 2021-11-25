import styles from './SearchField.module.css'
import {useRef} from "react";
import {verify} from "../../core/verify";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import {joinClassNames} from "../../core/styles/joinClassNames";
import {PlusCircleIcon} from "../../icons/PlusCircleIcon";

type SearchFieldProps = {
    value: string,
    onChange: (value: string) => void,
    onBlur?: (value: string) => void,
    onFocus?: () => void,
    placeholder?: string,
    className?: string,
    inputClassName?: string,
    disabled?: boolean,
}

function SearchField({
    onBlur,
    onFocus,
    placeholder,
    value,
    onChange,
    className,
    inputClassName,
    disabled = false,
}: SearchFieldProps) {
    const ref = useRef<HTMLInputElement|null>(null)

    function _onInput() {
        !disabled && onChange(verify(ref.current).value)
    }
    function _onBlur() {
        !disabled && onBlur && onBlur(verify(ref.current).value)
    }

    const inputStyles = getStylesWithMods(styles.input, {
        [styles.inputDisabled]: disabled,
    })

    return (
        <div
            className={joinClassNames(styles.fieldContainer, className)}
        >
            <div className={styles.searchIcon}>
                {<PlusCircleIcon/>}
            </div>
            <input
                ref={ref}
                className={joinClassNames(inputStyles, inputClassName)}
                onFocus={onFocus}
                onChange={_onInput}
                onBlur={_onBlur}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    )
}

export {
    SearchField,
}