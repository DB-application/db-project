import {Checkbox} from "./Checkbox";
import styles from "./CheckboxWithLabel.module.css"
import {joinClassNames} from "../../core/styles/joinClassNames";
import {StyledComponent} from "../../core/styles/StyledComponent";

type CheckboxWithLabelProps = StyledComponent<{
    checked: boolean,
    onCheckedChange: (value: boolean) => void,
    label: string,
}>

function CheckboxWithLabel({
    checked,
    onCheckedChange,
    label,
    className,
}: CheckboxWithLabelProps) {

    function _onClick() {
        onCheckedChange(!checked)
    }

    return (
        <div className={joinClassNames(styles.container, className)}>
            <Checkbox
                checked={checked}
                onCheckedChange={value => onCheckedChange(value)}
            />
            <label
                className={styles.label}
                onClick={_onClick}
            >
                {label}
            </label>
        </div>
    )
}

export {
    CheckboxWithLabel,
}