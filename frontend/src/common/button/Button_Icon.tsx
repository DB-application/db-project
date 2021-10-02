import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";


type Button_IconProps = {
    icon: JSX.Element,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
}

function Button_Icon({
    icon,
    onClick,
    className,
    size,
    state,
}: Button_IconProps) {
    return <Button_Base
        leftIcon={icon}
        className={className}
        size={size}
        state={state}
        onClick={onClick}
    />
}

export {
    Button_Icon,
}