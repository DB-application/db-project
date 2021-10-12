import styles from './TextField.module.css'
import {useRef} from "react";
import { verify } from '../../core/verify';
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import {joinClassNames} from "../../core/styles/joinClassNames";


type TextFieldProps = {
    type?: 'text' | 'password' | 'tel',
    value: string,
    onChange: (value: string) => void,
    onBlur?: () => void,
    description?: string,
    errorText?: string,
    placeholder?: string,
    className?: string,
}

function TextField({
    description,
    type = 'text',
    onBlur,
    placeholder,
    value,
    onChange,
    errorText,
    className
}: TextFieldProps) {
    const ref = useRef<HTMLInputElement|null>(null)

    function _onInput() {
        onChange(verify(ref.current).value)
    }

    const inputClassName = getStylesWithMods(styles.input, {
        [styles.inputError]: !!errorText,
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
                    className={inputClassName}
                    onChange={_onInput}
                    onBlur={onBlur}
                    value={value}
                    placeholder={placeholder}
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