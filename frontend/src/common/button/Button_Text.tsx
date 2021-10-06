import {Button_Base, Button_Size_Type, Button_State_Type} from "./Button_Base";
import React, {ForwardedRef} from "react";


type Button_TextProps = {
    text: string,
    onClick: () => void,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
}

const Button_Text = React.forwardRef((props: Button_TextProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button_Base
        ref={ref}
        text={props.text}
        className={props.className}
        size={props.size}
        state={props.state}
        onClick={props.onClick}
    />
})

export {
    Button_Text,
}