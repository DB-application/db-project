import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";
import React, {ForwardedRef} from "react";


type Button_TextAndIconProps = {
    icon: JSX.Element,
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    tooltipText?: string,
}

function Button_TextAndIcon(props: Button_TextAndIconProps) {
    return <Button_Base
        text={props.text}
        rightIcon={props.icon}
        className={props.className}
        size={props.size}
        state={props.state}
        onClick={props.onClick}
        tooltipText={props.tooltipText}
    />
}

export {
    Button_TextAndIcon,
}