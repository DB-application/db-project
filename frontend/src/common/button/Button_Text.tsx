import {Button_Base, Button_Size_Type, Button_State_Type, Button_Style_Type} from "./Button_Base";
import React from "react";


type Button_TextProps = {
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    tooltipText?: string,
    style: Button_Style_Type,
    spacing?: boolean,
}

function Button_Text(props: Button_TextProps) {
    return <Button_Base
        text={props.text}
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
    Button_Text,
}