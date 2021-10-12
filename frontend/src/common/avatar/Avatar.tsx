import Avatar from "react-avatar"

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
            return '30px'
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
    return(
        <Avatar
            name={label}
            src={avatarUrl}
            onClick={onClick}
            className={className}
            color={color}
            size={getAvatarSize(size)}
            round={true}
        />
    )
}

export {
    AvatarWrapper,
}

export type {
    AvatarProps,
    AvatarSize,
}