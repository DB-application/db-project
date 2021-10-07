import {ListItem_Base} from "./ListItem_Base";


type ListItem_IconAndTextProps = {
    icon: JSX.Element,
    text: string,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}

function ListItem_IconAndText({
    icon,
    text,
    tooltipText,
    onClick,
    className,
}: ListItem_IconAndTextProps) {
    return <ListItem_Base
        iconLeft={icon}
        text={text}
        className={className}
        tooltipText={tooltipText}
        onClick={onClick}
    />
}

export {
    ListItem_IconAndText,
}

export type {
    ListItem_IconAndTextProps,
}