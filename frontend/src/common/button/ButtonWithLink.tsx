import {withRouter} from "react-router-dom";
import {Button_Base, Button_BaseProps, Button_Size_Type, Button_State_Type, Button_Style_Type} from "./Button_Base";
import {RouteComponentProps} from "react-router";


type ButtonWithLinkProps = {
    leftIcon?: JSX.Element,
    text?: string,
    rightIcon?: JSX.Element,
    path: string,
    className?: string,
    size?: Button_Size_Type,
    state?: Button_State_Type,
    tooltipText?: string,
    style: Button_Style_Type,
    spacing?: boolean,
}

const ButtonWithLink = withRouter(({history, ...props}: RouteComponentProps<any> & ButtonWithLinkProps) => {

    return <Button_Base
        text={props.text}
        className={props.className}
        state={props.state}
        style={props.style}
        tooltipText={props.tooltipText}
        spacing={props.spacing}
        rightIcon={props.rightIcon}
        leftIcon={props.leftIcon}
        size={props.size}
        onClick={() => history.replace(props.path)}
    />
})

export {
    ButtonWithLink,
}