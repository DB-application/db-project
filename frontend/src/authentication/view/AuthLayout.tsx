import {useAtom} from "@reatom/react";
import {LoginLayout} from "./LoginLayout";
import {RegistrationLayout} from "./RegistrationLayout";
import {loginFormAtom} from "../viewModel/loginFormMode";

function AuthLayout() {
    const {mode} = useAtom(loginFormAtom)
    return mode === 'login'
        ? <LoginLayout/>
        : <RegistrationLayout/>
}

export {
    AuthLayout,
}