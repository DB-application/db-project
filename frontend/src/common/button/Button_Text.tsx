import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";


type Button_TextProps = {
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
}

function Button_Text({
    text,
    onClick,
    className,
    size,
    state,
}: Button_TextProps) {
    return <Button_Base
        text={text}
        className={className}
        size={size}
        state={state}
        onClick={onClick}
    />
}

export {
    Button_Text,
}