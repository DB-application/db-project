import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";
import React, {ForwardedRef} from "react";


type Button_TextAndIconProps = {
    icon: JSX.Element,
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
}

const Button_TextAndIcon = React.forwardRef((props: Button_TextAndIconProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button_Base
        ref={ref}
        text={props.text}
        rightIcon={props.icon}
        className={props.className}
        size={props.size}
        state={props.state}
        onClick={props.onClick}
    />
})

export {
    Button_TextAndIcon,
}