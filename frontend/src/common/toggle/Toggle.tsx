import styles from './Toggle.module.css'
import {useRef} from "react";
import {useEventHandler} from "../../core/hooks/useEventHandler";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";

type ToggleProps = {
    checked: boolean,
    onCheckedChange: (checked: boolean) => void,
    className?: string,
}

function Toggle({
    checked,
    onCheckedChange,
    className,
}: ToggleProps) {
    const ref = useRef<HTMLInputElement|null>(null)

    useEventHandler('click', ref, () => {
        onCheckedChange(!checked)
    })

    const toggleClassName = getStylesWithMods(styles.input, {
        [styles.inputChecked]: checked,
    })

    return (
        <label className={styles.switch}>
            <input
                ref={ref}
                type="checkbox"
                className={toggleClassName}
                tabIndex={0}
            />
            <span className={styles.round} />
        </label>
    )
}

export {
    Toggle,
}