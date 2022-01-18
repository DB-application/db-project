import styles from './FormField.module.css'
import {useMemo, useRef, useState} from "react";
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
    placeholder: string,
    errorText: string | null,
}

type InputProps = {
    inputType: 'text' | 'password',
    showIcon?: JSX.Element,
    value: string,
    onChange: (value: string) => void,
    onBlur: () => void,
    onEnter?: () => void,
    placeholder: string,
    errorText: string | null,
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

function ErrorBlock({errorText}: {errorText: string}) {
    return <div className={styles.errorText}>
        {errorText}
    </div>
}

function InputField({
    onBlur,
    placeholder,
    onEnter,
    onChange,
    inputType,
    value,
    showIcon,
    errorText,
}: InputProps) {
    const ref = useRef<HTMLInputElement|null>(null)
    const [focus, setFocus] = useState(false)
    const [hover, setHover] = useState(false)

    const _onInput = () => ref.current && onChange(ref.current.value)
    const _onKeyDown = (e: any) => e.code === 'Enter' && onEnter && onEnter()

    const _onFocus = () => setFocus(true)
    const _onBlur = () => {
        setFocus(false)
        onBlur()
    }
    const _mouseOver = () => setHover(true)
    const _mouseOut = () => setHover(false)

    const containerClassname = getStylesWithMods(styles.inputContainer, {
        [styles.inputContainerFocus]: focus,
        [styles.inputContainerHover]: hover,
        [styles.inputContainerError]: !!errorText,
    })

    return (
        <div
            className={containerClassname}
        >
            <input
                ref={ref}
                className={styles.input}
                onBlur={_onBlur}
                onMouseOver={_mouseOver}
                onMouseOut={_mouseOut}
                onFocus={_onFocus}
                onKeyDown={_onKeyDown}
                onInput={_onInput}
                type={inputType}
                value={value}
                placeholder={placeholder}
            />
            {showIcon}
        </div>
    )
}

function PasswordField({
    value,
    onChange,
    onBlur,
    placeholder,
    onEnter,
    errorText,
}: FieldProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return <InputField
        inputType={showPassword ? 'text' : 'password'}
        showIcon={<ShowPasswordIcon
            showPassword={showPassword}
            onClick={() => setShowPassword(!showPassword)}
        />}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        onEnter={onEnter}
        errorText={errorText}
    />
}

function TextField({
    value,
    onChange,
    onBlur,
    placeholder,
    onEnter,
    errorText,
}: FieldProps) {
    return <InputField
        inputType={'text'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        onEnter={onEnter}
        errorText={errorText}
    />
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

    const fieldProps: FieldProps = useMemo(() => ({
        onChange,
        onBlur,
        value,
        placeholder,
        onEnter,
        errorText,
    }), [errorText, value, placeholder, onEnter, errorText, onBlur, onChange])

    const inputBinding = useMemo(() => {
        switch (type) {
            case "text":
                return <TextField {...fieldProps} />
            case "password":
                return <PasswordField {...fieldProps} />
            default:
                throw new Error(`unknown input type ${type}`)
        }
    }, [fieldProps])

    return (
        <div
            className={joinClassNames(styles.fieldContainer, className)}
        >
            {inputBinding}
            {errorText && <ErrorBlock errorText={errorText} />}
        </div>
    )
}

export {
    FormField,
}