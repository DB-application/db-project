import styles from './ListItem_Base.module.css'
import React, {useRef} from "react";
import {joinClassNames} from "../../../core/styles/joinClassNames";
import {useEventHandler} from "../../../core/hooks/useEventHandler";
import {TooltipPortal} from "../../../core/portal/TooltipPortal";

type ListItem_BaseProps = {
    iconLeft?: JSX.Element,
    text: string,
    iconRight?: JSX.Element,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}

type ItemIconProps = {
    binding: JSX.Element,
    className: string,
}

type ItemTextProps = {
    text: string,
    className: string,
}

function _ItemIcon({
    className,
    binding,
}: ItemIconProps) {
    return (<div className={className}>{binding}</div>)
}

function _ItemText({
    className,
    text,
}: ItemTextProps) {
    return (<div className={className}>{text}</div>)
}

function ListItem_Base({
    iconLeft,
    text,
    iconRight,
    className,
    onClick,
    tooltipText,
}: ListItem_BaseProps) {
    const itemRef = useRef<HTMLDivElement|null>(null)

    const itemClassName = joinClassNames(styles.item, className)

    useEventHandler('click', itemRef, e => {
        e.preventDefault()
        onClick && onClick()
    })

    return (
        <div
            className={itemClassName}
            ref={itemRef}
        >
            {iconLeft && React.cloneElement(iconLeft, {className: styles.iconLeft})}
            <_ItemText text={text} className={styles.text}/>
            {iconRight && React.cloneElement(iconRight, {className: styles.iconRight})}
            <TooltipPortal
                elementRef={itemRef}
                showTooltip={!!tooltipText}
                text={tooltipText || ''}
            />
        </div>
    )
}

export {
    ListItem_Base,
}

export type {
    ListItem_BaseProps,
}