import {BxCheckboxCheckedIcon} from "../../icons/BxCheckboxCheckedIcon";
import {BxCheckboxSquareIcon} from "../../icons/BxCheckboxSquareIcon";
import {BxCheckboxIcon} from "../../icons/BxCheckboxIcon";
import styles from "./Checkbox.module.css"
import {joinClassNames} from "../../core/styles/joinClassNames";

type CheckboxProps = {
    checked: boolean|null,
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

    const binding = checked
        ? <BxCheckboxCheckedIcon/>
        : checked == null
            ? <BxCheckboxSquareIcon/>
            : <BxCheckboxIcon/>

    return (
        <div
            onClick={_onClick}
            className={joinClassNames(className, styles.checkbox)}
            tabIndex={0}
        >
            {binding}
        </div>
    )
}

export {
    Checkbox
}

export type {
    CheckboxProps
}