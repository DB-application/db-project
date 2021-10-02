import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";

type Button_IconAndTextProps = {
    icon: JSX.Element,
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
}

function Button_IconAndText({
    icon,
    text,
    onClick,
    className,
    size,
    state,
}: Button_IconAndTextProps) {
    return <Button_Base
        leftIcon={icon}
        text={text}
        className={className}
        size={size}
        state={state}
        onClick={onClick}
    />
}

export {
    Button_IconAndText,
}