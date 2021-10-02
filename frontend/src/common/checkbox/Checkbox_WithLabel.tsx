import {Checkbox} from "./Checkbox";
import styles from "./Checkbox_WithLabel.module.css"
import {joinClassNames} from "../../core/styles/joinClassNames";

type Checkbox_WithLabelProps = {
    checked: boolean|null,
    onCheckedChange: (value: boolean) => void,
    label: string,
    className?: string,
}

function Checkbox_WithLabel({
    checked,
    onCheckedChange,
    label,
    className,
}: Checkbox_WithLabelProps) {

    function _onClick() {
        onCheckedChange(!checked)
    }

    return (
        <div className={joinClassNames(styles.container, className)}>
            <Checkbox
                checked={checked}
                onCheckedChange={value => onCheckedChange(value)}
                className={className}
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
    Checkbox_WithLabel,
}