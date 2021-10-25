import {useRef} from "react";
import {verify} from "../../core/verify";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import styles from "./TextArea.module.css";
import {joinClassNames} from "../../core/styles/joinClassNames";

type TextAreaProps = {
    value: string,
    onChange: (value: string) => void,
    onBlur?: (value: string) => void,
    onFocus?: () => void,
    description?: string,
    errorText?: string,
    placeholder?: string,
    className?: string,
    areaClassName?: string,
}

function TextArea({
    areaClassName,
    description,
    errorText,
    className,
    onFocus,
    placeholder,
    value,
    onChange,
    onBlur,
}: TextAreaProps) {
    const ref = useRef<HTMLTextAreaElement|null>(null)

    function _onInput() {
        onChange(verify(ref.current).value)
    }
    function _onBlur() {
        onBlur && onBlur(verify(ref.current).value)
    }

    const areaStyles = getStylesWithMods(styles.area, {
        [styles.areaError]: !!errorText,
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
            <textarea
                ref={ref}
                className={joinClassNames(areaStyles, areaClassName)}
                onFocus={onFocus}
                onChange={_onInput}
                onBlur={_onBlur}
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
    TextArea,
}