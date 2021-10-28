import styles from './TextField.module.css'
import {useRef} from "react";
import { verify } from '../../core/verify';
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import {joinClassNames} from "../../core/styles/joinClassNames";


type TextFieldProps = {
    type?: 'text' | 'password' | 'tel',
    value: string,
    onChange: (value: string) => void,
    onBlur?: (value: string) => void,
    onFocus?: () => void,
    description?: string,
    errorText?: string,
    placeholder?: string,
    className?: string,
    inputClassName?: string,
    disabled?: boolean,
}

function TextField({
    description,
    type = 'text',
    onBlur,
    onFocus,
    placeholder,
    value,
    onChange,
    errorText,
    className,
    inputClassName,
    disabled = false,
}: TextFieldProps) {
    const ref = useRef<HTMLInputElement|null>(null)

    function _onInput() {
        !disabled && onChange(verify(ref.current).value)
    }
    function _onBlur() {
        !disabled && onBlur && onBlur(verify(ref.current).value)
    }

    const inputStyles = getStylesWithMods(styles.input, {
        [styles.inputError]: !!errorText,
        [styles.inputDisabled]: disabled,
    })

    return (
        <div
            className={joinClassNames(styles.fieldContainer, className)}
        >
            {description &&
                <div className={styles.description}>
                    {description}
                </div>
            }
                <input
                    ref={ref}
                    type={type}
                    className={joinClassNames(inputStyles, inputClassName)}
                    onFocus={onFocus}
                    onChange={_onInput}
                    onBlur={_onBlur}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            {errorText &&
                <div className={styles.errorText}>
                    {errorText}
                </div>
            }
        </div>
    )
}

export {
    TextField,
}