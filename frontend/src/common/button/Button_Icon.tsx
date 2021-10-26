import {Button_Base, Button_Size_Type, Button_State_Type, Button_Style_Type} from "./Button_Base";
import React, {ForwardedRef} from "react";


type Button_IconProps = {
    icon: JSX.Element,
    onClick: () => void,
    className?: string,
    tooltipText?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    style: Button_Style_Type,
    spacing?: boolean,
}

function Button_Icon(props: Button_IconProps) {

    return <Button_Base
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
    Button_Icon,
}