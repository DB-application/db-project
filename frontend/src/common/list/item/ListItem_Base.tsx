import styles from './ListItem_Base.module.css'
import {useRef} from "react";
import {useTooltip} from "../../../core/hooks/useTooltip";
import {joinClassNames} from "../../../core/styles/joinClassNames";
import {useEventHandler} from "../../../core/hooks/useEventHandler";

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

    useTooltip({
        text: tooltipText || '',
        showTooltip: !!tooltipText,
        elementRef: itemRef,
    })

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
            {iconLeft && <_ItemIcon binding={iconLeft} className={styles.iconLeft}/>}
            <_ItemText text={text} className={styles.text}/>
            {iconRight && <_ItemIcon binding={iconRight} className={styles.iconRight}/>}
        </div>
    )
}

export {
    ListItem_Base,
}

export type {
    ListItem_BaseProps,
}