import styles from "./Checkbox.module.css"
import {joinClassNames} from "../../core/styles/joinClassNames";
import {BxCheckIcon} from "../../icons/BxCheckIcon";
import { useRef } from "react";
import {useEventHandler} from "../../core/hooks/useEventHandler";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";

type CheckboxProps = {
    checked: boolean,
    onCheckedChange: (value: boolean) => void,
    className?: string,
}

function Checkbox({
    checked,
    onCheckedChange,
    className,
}: CheckboxProps) {
    const ref = useRef<HTMLInputElement|null>(null)

    useEventHandler('click', ref, () => {
        onCheckedChange(!checked)
    })

    const checkboxClassName = getStylesWithMods(styles.input, {
        [styles.inputChecked]: checked,
    })
    return (
        <div
            className={joinClassNames(className, styles.checkbox)}
        >
            <input
                ref={ref}
                type="checkbox"
                className={checkboxClassName}
                tabIndex={0}
            />
            {checked && <BxCheckIcon className={styles.icon} />}
        </div>
    )
}

export {
    Checkbox
}

export type {
    CheckboxProps
}