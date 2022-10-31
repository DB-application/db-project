import {ListItemBase} from "./ListItemBase";


type ListItemIconAndTextProps = {
    icon: JSX.Element,
    text: string,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}

function ListItemIconAndText({
    icon,
    text,
    tooltipText,
    onClick,
    className,
}: ListItemIconAndTextProps) {
    return <ListItemBase
        iconLeft={icon}
        text={text}
        className={className}
        tooltipText={tooltipText}
        onClick={onClick}
    />
}

export {
    ListItemIconAndText,
}

export type {
    ListItemIconAndTextProps,
}