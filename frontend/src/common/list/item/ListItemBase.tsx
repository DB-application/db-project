import styles from './ListItemBase.module.css'
import React, {useRef} from "react";
import {joinClassNames} from "../../../core/styles/joinClassNames";
import {useEventHandler} from "../../../core/hooks/useEventHandler";
import {TooltipPortal} from "../../../core/portal/TooltipPortal";

type ListItemBaseProps = {
    iconLeft?: JSX.Element,
    text: string,
    iconRight?: JSX.Element,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}

type ItemTextProps = {
    text: string,
    className: string,
}

function _ItemText({
    className,
    text,
}: ItemTextProps) {
    return (<div className={className}>{text}</div>)
}

function ListItemBase({
    iconLeft,
    text,
    iconRight,
    className,
    onClick,
    tooltipText,
}: ListItemBaseProps) {
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
    ListItemBase,
}

export type {
    ListItemBaseProps,
}