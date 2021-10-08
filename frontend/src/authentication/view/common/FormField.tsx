import styles from './FormField.module.css'
import {useRef} from "react";
import {joinClassNames} from "../../../core/styles/joinClassNames";
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";
import {EyeIcon} from "../../../icons/EyeIcon";
import {EyeSlashIcon} from "../../../icons/EyeSlashIcon";

type FormFieldDefaultProps = {
    value: string,
    onChange: (value: string) => void,
    onBlur: () => void,
    errorText: string | null,
    placeholder: string,
    className?: string,
}

type FormFieldProps = FormFieldDefaultProps & ({
    type: 'text',
} | {
    type: 'password',
    showPassword: boolean,
    onChangeShowPassword: (show: boolean) => void,
})

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
                    ? <EyeSlashIcon />
                    : <EyeIcon />
            }
        </div>
    )
}

function FormField(props: FormFieldProps) {
    const ref = useRef<HTMLInputElement>(null)

    const {
        type,
        onChange,
        onBlur,
        errorText,
        value,
        placeholder,
        className,
    } = props

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
            <div className={styles.inputContainer}>
                <input
                    ref={ref}
                    className={inputClassNames}
                    onBlur={onBlur}
                    onInput={_onInput}
                    type={type == 'password'
                        ? props.showPassword
                            ? 'password'
                            : 'text'
                        : 'text'
                    }
                    value={value}
                    placeholder={placeholder}
                />
                {
                    type === 'password' && <ShowPasswordIcon
                        showPassword={props.showPassword}
                        onClick={() => props.onChangeShowPassword(!props.showPassword)}
                    />
                }
            </div>
            {errorText && <div className={styles.errorText}>
                {errorText}
            </div>}
        </div>
    )
}

export {
    FormField,
}