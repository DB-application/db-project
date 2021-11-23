import Avatar from "react-avatar"
import styles from './Avatar.module.css'
import {useEffect, useRef} from "react";

type AvatarSize = 'xSmall' | 'small' | 'normal' | 'large' | 'xLarge'

type AvatarProps = {
    label: string,
    avatarUrl?: string,
    size?: AvatarSize,
    color?: string,
    className?: string,
    onClick?: () => void,
}

function getAvatarSize(size: AvatarSize) {
    switch (size) {
        case "xSmall":
            return '25px'
        case "small":
            return '32px'
        case "normal":
            return '50px'
        case "large":
            return '80px'
        case "xLarge":
            return '120px'
        default:
            return ''
    }
}

function AvatarWrapper({
    label,
    avatarUrl,
    size = 'normal',
    color = '#2972E0',
    className,
    onClick,
}: AvatarProps) {
    const ref = useRef<HTMLDivElement|null>(null)
    useEffect(() => {
        const avatar = ref.current && ref.current.querySelector('.sb-avatar__text')
        avatar && avatar.removeAttribute('title')
    }, [ref, ref.current])

    return(
        <div ref={ref} className={styles.avatarWrapper}>
            <Avatar
                name={label}
                src={avatarUrl}
                onClick={onClick}
                className={className}
                color={color}
                size={getAvatarSize(size)}
                round={true}
            />
        </div>
    )
}

export {
    AvatarWrapper,
}

export type {
    AvatarProps,
    AvatarSize,
}