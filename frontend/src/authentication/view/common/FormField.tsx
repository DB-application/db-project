import styles from './FormField.module.css'
import {useRef} from "react";
import {joinClassNames} from "../../../core/styles/joinClassNames";
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";

type FormFieldProps = {
    value: string,
    onChange: (value: string) => void,
    onBlur: () => void,
    errorText: string | null,
    placeholder: string,
    type?: 'text' | 'password',
    className?: string,
}

function FormField({
    value,
    onChange,
    onBlur,
    errorText,
    type = 'text',
    placeholder,
    className,
}: FormFieldProps) {
    const ref = useRef<HTMLInputElement>(null)

    function _onInput() {
        if (ref.current) {
            onChange(ref.current.value)
        }
    }

    const inputClassNames = getStylesWithMods(styles.input, {
        [styles.inputError]: !!errorText,
    })

    return (
        <div
            className={joinClassNames(styles.fieldContainer, className)}
        >
            <input
                ref={ref}
                className={inputClassNames}
                onBlur={onBlur}
                onInput={_onInput}
                type={type}
                value={value}
                placeholder={placeholder}
            />
            {errorText && <div className={styles.errorText}>
                {errorText}
            </div>}
        </div>
    )
}

export {
    FormField,
}