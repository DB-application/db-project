import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";


type Button_TextAndIconProps = {
    icon: JSX.Element,
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
}

function Button_TextAndIcon({
    icon,
    text,
    onClick,
    className,
    size,
    state,
}: Button_TextAndIconProps) {
    return <Button_Base
        text={text}
        rightIcon={icon}
        className={className}
        size={size}
        state={state}
        onClick={onClick}
    />
}

export {
    Button_TextAndIcon,
}