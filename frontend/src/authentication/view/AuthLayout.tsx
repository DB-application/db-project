import {useAtom} from "@reatom/react";
import {LoginLayout} from "./LoginLayout";
import {RegistrationLayout} from "./RegistrationLayout";
import {loginFormAtom} from "../viewModel/loginFormMode";
import {currentUserAtom} from "../viewModel/currentUserAtom";
import {Redirect} from "react-router-dom"

function AuthLayout() {
    const user = useAtom(currentUserAtom)
    const {mode} = useAtom(loginFormAtom)

    if (user.isAuthUser) {
        return <Redirect to="/workspace" />
    }
    return mode === 'login'
        ? <LoginLayout/>
        : <RegistrationLayout/>
}

export {
    AuthLayout,
}