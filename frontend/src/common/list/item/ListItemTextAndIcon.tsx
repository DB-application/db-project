import {ListItemBase} from "./ListItemBase";

type ListItemTextAndIconProps = {
    icon: JSX.Element,
    text: string,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}

function ListItemTextAndIcon({
    icon,
    text,
    tooltipText,
    onClick,
    className,
}: ListItemTextAndIconProps) {
    return <ListItemBase
        iconRight={icon}
        text={text}
        className={className}
        tooltipText={tooltipText}
        onClick={onClick}
    />
}

export {
    ListItemTextAndIcon,
}

export type {
    ListItemTextAndIconProps,
}