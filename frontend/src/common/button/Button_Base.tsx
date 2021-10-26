import styles from './Button_Base.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames"
import {PreloaderIcon} from '../preloader/Preloader'
import {getStylesWithMods} from '../../core/styles/getStylesWithMods'
import React, {useRef} from "react";
import {TooltipPortal} from "../../core/portal/TooltipPortal";

type Button_Size_Type = 'small' | 'medium' | 'large'

type Button_State_Type = 'normal' | 'disabled' | 'preloader'

type Button_Style_Type = 'primary' | 'secondary' | 'link' | 'danger'

type Button_BaseProps = {
    leftIcon?: JSX.Element,
    text?: string,
    rightIcon?: JSX.Element,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    tooltipText?: string,
    style: Button_Style_Type,
    spacing?: boolean,
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

function Button_Base(props: Button_BaseProps) {
    const ref = useRef<HTMLButtonElement|null>(null)
    const {
        leftIcon,
        text,
        rightIcon,
        onClick,
        className,
        size = 'medium',
        state = 'normal',
        tooltipText,
        style,
        spacing = true,
    } = props
    function _onClick() {
        if (state === 'normal') {
            onClick()
        }
    }
    const buttonClassName = getStylesWithMods(styles.button, {
        [styles.buttonSmall]: size === 'small',
        [styles.buttonMedium]: size === 'medium',
        [styles.buttonLarge]: size === 'large',
        [styles.buttonPreloader]: state === 'preloader',
        [styles.buttonPrimary]: style === 'primary',
        [styles.buttonSecondary]: style === 'secondary',
        [styles.buttonDanger]: style === 'danger',
        [styles.buttonLink]: style === 'link',
        [styles.buttonMinWidth]: !!text,
        [styles.buttonSpacingNone]: !spacing,
        [styles.buttonIconOnly]: !text && (!!leftIcon || !!rightIcon),
    })

    return(
        <button
            onClick={_onClick}
            className={joinClassNames(buttonClassName, className)}
            disabled={state === 'disabled'}
            ref={ref}
        >
            {state === 'preloader' && <PreloaderIcon className={styles.preloader} />}
            {state !== 'preloader' && leftIcon && <_Icon icon={leftIcon} className={styles.leftIcon}/>}
            {state !== 'preloader' && text && <_Text text={text} />}
            {state !== 'preloader' && rightIcon && <_Icon icon={rightIcon} className={styles.rightIcon}/>}
            <TooltipPortal
                elementRef={ref}
                showTooltip={!!tooltipText}
                text={tooltipText || ''}
                align={'center'}
            />
        </button>
    )
}

export {
    Button_Base,
}

export type {
    Button_Size_Type,
    Button_BaseProps,
    Button_State_Type,
    Button_Style_Type,
}