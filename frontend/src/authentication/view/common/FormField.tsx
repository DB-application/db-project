import styles from './FormField.module.css'
import {useRef} from "react";
import {joinClassNames} from "../../../core/styles/joinClassNames";

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

    const fieldContainerStyle = errorText
        ? joinClassNames(styles.fieldContainer, styles.inputError)
        : styles.fieldContainer

    return (
        <div
            className={joinClassNames(fieldContainerStyle, className)}
        >
            <input
                ref={ref}
                className={styles.input}
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