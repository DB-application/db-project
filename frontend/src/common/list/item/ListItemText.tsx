import {ListItemBase} from "./ListItemBase";

type ListItemTextProps = {
    text: string,
    className?: string,
    onClick?: () => void,
    tooltipText?: string,
}


function ListItemText({
    text,
    tooltipText,
    onClick,
    className,
}: ListItemTextProps) {
    return <ListItemBase
        text={text}
        className={className}
        tooltipText={tooltipText}
        onClick={onClick}
    />
}

export {
    ListItemText,
}

export type {
    ListItemTextProps,
}