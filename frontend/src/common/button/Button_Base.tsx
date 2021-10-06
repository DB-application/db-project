import styles from './Button_Base.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames"
import { Preloader } from '../preloader/Preloader'
import { getStylesWithMods } from '../../core/styles/getStylesWithMods'
import {ForwardedRef} from "react";
import React from 'react';

type Button_Size_Type = 'small' | 'medium' | 'large'

type Button_State_Type = 'normal' | 'disabled' | 'preloader'

type Button_BaseProps = {
    leftIcon?: JSX.Element,
    text?: string,
    rightIcon?: JSX.Element,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type
}

function _Text({text}: {text: string}) {
    return(
        <div className={styles.text}>{text}</div>
    )
}

function _Icon({
    icon,
    className,
}: {icon: JSX.Element, className: string}) {
    return(
        <div className={className}>{icon}</div>
    )
}

const Button_Base = React.forwardRef((props: Button_BaseProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        leftIcon,
        text,
        rightIcon,
        onClick,
        className,
        size = 'medium',
        state = 'normal',
    } = props
    function _onClick() {
        onClick()
    }

    const buttonClassName = getStylesWithMods(styles.button, {
        [styles.buttonSmall]: size === 'small',
        [styles.buttonMedium]: size === 'medium',
        [styles.buttonLarge]: size === 'large',
        [styles.buttonPreloader]: state === 'preloader',
    })

    return(
        <button
            onClick={_onClick}
            className={joinClassNames(buttonClassName, className)}
            disabled={state === 'disabled'}
            ref={ref}
        >
            {state === 'preloader' && <Preloader />}
            {state !== 'preloader' && leftIcon && <_Icon icon={leftIcon} className={styles.leftIcon}/>}
            {state !== 'preloader' && text && <_Text text={text} />}
            {state !== 'preloader' && rightIcon && <_Icon icon={rightIcon} className={styles.rightIcon}/>}
        </button>
    )
})

export {
    Button_Base,
}

export type {
    Button_Size_Type,
    Button_BaseProps,
    Button_State_Type,
}