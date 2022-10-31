import styles from './ButtonBase.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames"
import {PreloaderIcon} from '../preloader/Preloader'
import {getStylesWithMods} from '../../core/styles/getStylesWithMods'
import React, {CSSProperties, useRef} from "react";
import {TooltipPortal} from "../../core/portal/TooltipPortal";
import {useEventHandler} from "../../core/hooks/useEventHandler";

type Button_Size_Type = 'small' | 'medium' | 'large'

type Button_State_Type = 'normal' | 'disabled' | 'preloader'

type Button_Style_Type = 'primary' | 'secondary' | 'link' | 'danger'

type ButtonBaseProps = {
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

function Text({text}: {text: string}) {
    return(
        <div className={styles.text}>{text}</div>
    )
}

function Icon({
    icon,
    className,
}: {icon: JSX.Element, className: string}) {
    return(
        <div className={className}>{icon}</div>
    )
}

function ButtonBase(props: ButtonBaseProps) {
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

    function _onClick(e: any) {
        e.preventDefault()
        if (state === 'normal') {
            onClick()
        }
    }

    useEventHandler('click', ref, _onClick)

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

    let heightStyle: CSSProperties | undefined = undefined
    if (state === 'preloader' && ref.current) {
        heightStyle = {
            width: ref.current.getBoundingClientRect().width
        }
    }

    return(
        <button
            className={joinClassNames(buttonClassName, className)}
            disabled={state === 'disabled'}
            ref={ref}
            style={heightStyle}
        >
            {state === 'preloader' && <PreloaderIcon className={styles.preloader} />}
            {state !== 'preloader' && leftIcon && React.cloneElement(leftIcon, {className: styles.leftIcon})}
            {state !== 'preloader' && text && <Text text={text} />}
            {state !== 'preloader' && rightIcon && <Icon icon={rightIcon} className={styles.rightIcon}/>}
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
    ButtonBase,
}

export type {
    Button_Size_Type,
    ButtonBaseProps,
    Button_State_Type,
    Button_Style_Type,
}