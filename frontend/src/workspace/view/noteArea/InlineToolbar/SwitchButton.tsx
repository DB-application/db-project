import {getStylesWithMods} from "../../../../core/styles/getStylesWithMods";
import { joinClassNames } from "../../../../core/styles/joinClassNames";
import styles from './SwitchButton.module.css'

type SwitchButtonProps = {
    checked: boolean,
    onCheckedChange: (value: boolean) => void,
    className?: string,
    icon: JSX.Element
}

function SwitchButton({
    onCheckedChange,
    className,
    icon,
    checked,
}: SwitchButtonProps) {

    const buttonClassName = getStylesWithMods(styles.button, {
        [styles.checked]: checked,
    })

    return(
        <button
            className={joinClassNames(buttonClassName, className)}
            onClick={() => onCheckedChange(!checked)}
        >
            {icon}
        </button>
    )
}

export {
    SwitchButton
}

export type {
    SwitchButtonProps,
}