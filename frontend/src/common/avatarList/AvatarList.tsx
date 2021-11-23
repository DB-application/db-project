import {AvatarProps, AvatarWrapper} from "../avatar/Avatar"
import styles from './AvatarList.module.css'
import {useRef} from "react";
import {TooltipPortal} from "../../core/portal/TooltipPortal";
import {joinClassNames} from "../../core/styles/joinClassNames";

type AvatarListProps = {
    avatarsData: Array<AvatarProps>,
    getCounterBinding: (counter: number) => JSX.Element|null,
    className?: string,
}

function AvatarListItem({
    label,
    avatarUrl,
    size,
    onClick,
    className,
    color,
}: AvatarProps) {
    const ref = useRef<HTMLDivElement|null>(null)

    return (
        <>
            <div ref={ref} className={styles.avatarItem}>
                <AvatarWrapper
                    label={label}
                    onClick={onClick}
                    size={size}
                    avatarUrl={avatarUrl}
                    color={color}
                    className={className}
                />
            </div>
            <TooltipPortal
                elementRef={ref}
                text={label}
            />
        </>
    )
}

function Counter({
    counter,
}: {counter: JSX.Element}) {

    return (
        <div className={styles.avatarItem}>
            {counter}
        </div>
    )
}

function AvatarList({
    avatarsData,
    getCounterBinding,
    className,
}: AvatarListProps) {

    const showedAvatars = avatarsData.slice(0, Math.min(avatarsData.length, 4))
    const hiddenAvatars = avatarsData.slice(showedAvatars.length, avatarsData.length)

    const counterValue = hiddenAvatars.length
    const counter = getCounterBinding(counterValue)
    return (
        <div className={joinClassNames(styles.avatarsContainer, className)}>
            {showedAvatars.map((avatarData, index) => <AvatarListItem
                key={`avatar-${index}`}
                avatarUrl={avatarData.avatarUrl}
                onClick={avatarData.onClick}
                size={avatarData.size}
                label={avatarData.label}
                color={avatarData.color}
                className={avatarData.className}
            />)}
            {counter && <Counter counter={counter} /> }
        </div>
    )
}

export {
    AvatarList,
}