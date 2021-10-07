import {ListItem_Base} from "./ListItem_Base";

type ListItem_TextAndIconProps = {
    icon: JSX.Element,
    text: string,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}

function ListItem_TextAndIcon({
    icon,
    text,
    tooltipText,
    onClick,
    className,
}: ListItem_TextAndIconProps) {
    return <ListItem_Base
        iconRight={icon}
        text={text}
        className={className}
        tooltipText={tooltipText}
        onClick={onClick}
    />
}

export {
    ListItem_TextAndIcon,
}

export type {
    ListItem_TextAndIconProps,
}