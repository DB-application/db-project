import {ButtonBase, Button_Size_Type, Button_State_Type, Button_Style_Type} from "./ButtonBase";


type ButtonIconProps = {
    icon: JSX.Element,
    onClick: () => void,
    className?: string,
    tooltipText?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    style: Button_Style_Type,
    spacing?: boolean,
}

function ButtonIcon(props: ButtonIconProps) {

    return <ButtonBase
        leftIcon={props.icon}
        className={props.className}
        size={props.size}
        state={props.state}
        onClick={props.onClick}
        tooltipText={props.tooltipText}
        style={props.style}
        spacing={props.spacing}
    />
}

export {
    ButtonIcon,
}