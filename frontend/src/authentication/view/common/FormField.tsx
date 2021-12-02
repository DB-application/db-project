import styles from './FormField.module.css'
import {useRef, useState} from "react";
import {joinClassNames} from "../../../core/styles/joinClassNames";
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";
import {EyeIcon} from "../../../icons/EyeIcon";
import {EyeSlashIcon} from "../../../icons/EyeSlashIcon";

type FormFieldProps = {
    type: 'text' | 'password',
    value: string,
    onChange: (value: string) => void,
    onBlur: () => void,
    onEnter?: () => void,
    errorText: string | null,
    placeholder: string,
    className?: string,
}

type FieldProps = {
    value: string,
    onChange: (value: string) => void,
    onBlur: () => void,
    onEnter?: () => void,
    errorText: string | null,
    placeholder: string,
    className?: string,
}

type ShowPasswordIconProps = {
    showPassword: boolean,
    onClick: () => void,
}

function ShowPasswordIcon({
    showPassword,
    onClick,
}: ShowPasswordIconProps) {
    return(
        <div
            className={styles.showPasswordIcon}
            onClick={onClick}
        >
            {
                showPassword
                    ? <EyeIcon />
                    : <EyeSlashIcon />
            }
        </div>
    )
}

function PasswordField({
    value,
    onChange,
    onBlur,
    className,
    placeholder,
    onEnter,
}: FieldProps) {
    const ref = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    function _onInput() {
        if (ref.current) {
            onChange(ref.current.value)
        }
    }

    function _onKeyDown(e: any) {
        if (e.code === 'Enter') {
            onEnter && onEnter()
        }
    }

    return (
        <div className={styles.inputContainer}>
            <input
                ref={ref}
                className={className}
                onBlur={onBlur}
                onKeyDown={_onKeyDown}
                onInput={_onInput}
                type={showPassword
                    ? 'text'
                    : 'password'}
                value={value}
                placeholder={placeholder}
            />
            <ShowPasswordIcon
                showPassword={showPassword}
                onClick={() => setShowPassword(!showPassword)}
            />
        </div>
    )
}

function TextField({
    value,
    onChange,
    onBlur,
    className,
    placeholder,
    onEnter,
}: FieldProps) {
    const ref = useRef<HTMLInputElement>(null)

    function _onInput() {
        if (ref.current) {
            onChange(ref.current.value)
        }
    }

    function _onKeyDown(e: any) {
        if (e.code === 'Enter') {
            onEnter && onEnter()
        }
    }
    return(
        <div className={styles.inputContainer}>
            <input
                ref={ref}
                className={className}
                onBlur={onBlur}
                onInput={_onInput}
                onKeyDown={_onKeyDown}
                type={'text'}
                value={value}
                placeholder={placeholder}
            />
        </div>
    )
}

function FormField(props: FormFieldProps) {
    const {
        errorText,
        className,
        type,
        onBlur,
        placeholder,
        value,
        onChange,
        onEnter,
    } = props

    const inputClassNames = getStylesWithMods(styles.input, {
        [styles.inputError]: !!errorText,
    })

    const fieldProps: FieldProps = {
        errorText,
        onChange,
        onBlur,
        value,
        placeholder,
        onEnter,
        className: inputClassNames,
    }

    return (
        <div
            className={joinClassNames(styles.fieldContainer, className)}
        >
            {
                type === 'text'
                    ? <TextField {...fieldProps} />
                    : <PasswordField {...fieldProps} />
            }
            {
                errorText && <div className={styles.errorText}>
                    {errorText}
                </div>
            }
        </div>
    )
}

export {
    FormField,
}