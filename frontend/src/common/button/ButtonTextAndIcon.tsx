import {ButtonBase, Button_Size_Type, Button_State_Type, Button_Style_Type} from "./ButtonBase";

type ButtonTextAndIconProps = {
    icon: JSX.Element,
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    tooltipText?: string,
    style: Button_Style_Type,
    spacing?: boolean,
}

function ButtonTextAndIcon(props: ButtonTextAndIconProps) {
    return <ButtonBase
        text={props.text}
        rightIcon={props.icon}
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
    ButtonTextAndIcon,
}