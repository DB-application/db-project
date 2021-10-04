import {BxCheckboxCheckedIcon} from "../../icons/BxCheckboxCheckedIcon";
import {BxCheckboxSquareIcon} from "../../icons/BxCheckboxSquareIcon";
import {BxCheckboxIcon} from "../../icons/BxCheckboxIcon";
import styles from "./Checkbox.module.css"
import {joinClassNames} from "../../core/styles/joinClassNames";
import {BxCheckIcon} from "../../icons/BxCheckIcon";

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
    function _onClick() {
        onCheckedChange(!checked)
    }
    return (
        <div
            onClick={_onClick}
            className={joinClassNames(className, styles.checkbox)}
        >
            <input
                type="checkbox"
                checked={checked}
                className={styles.input}
                tabIndex={0}
            />
            {checked && <div className={styles.icon}>
                <BxCheckIcon/>
            </div>}
        </div>
    )
}

export {
    Checkbox
}

export type {
    CheckboxProps
}