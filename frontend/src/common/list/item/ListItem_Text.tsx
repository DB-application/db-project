import {ListItem_Base} from "./ListItem_Base";

type ListItem_TextProps = {
    text: string,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}


function ListItem_Text({
    text,
    tooltipText,
    onClick,
    className,
}: ListItem_TextProps) {
    return <ListItem_Base
        text={text}
        className={className}
        tooltipText={tooltipText}
        onClick={onClick}
    />
}

export {
    ListItem_Text,
}

export type {
    ListItem_TextProps,
}