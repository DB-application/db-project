import {getStylesWithMods} from "../../../../core/styles/getStylesWithMods";
import {joinClassNames} from "../../../../core/styles/joinClassNames";
import styles from './SwitchButton.module.css'
import React, {MutableRefObject} from "react";

type SwitchButtonProps = {
    checked: boolean,
    onCheckedChange: (value: boolean) => void,
    className?: string,
    icon: JSX.Element
}

const SwitchButton = React.forwardRef<HTMLButtonElement, SwitchButtonProps>(
    ({
        className,
        icon,
        checked,
        onCheckedChange,
    }, ref) => {
        const buttonRef = ref as MutableRefObject<HTMLButtonElement|null>
        const buttonClassName = getStylesWithMods(styles.button, {
            [styles.checked]: checked,
        })

        return(
            <button
                ref={buttonRef}
                className={joinClassNames(buttonClassName, className)}
                onClick={() => onCheckedChange(!checked)}
            >
                {icon}
            </button>
        )
    }
)

export {
    SwitchButton
}

export type {
    SwitchButtonProps,
}