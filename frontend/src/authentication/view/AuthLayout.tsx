import {useAtom} from "@reatom/react";
import {loginPageDataAtom} from "../viewModel/loginPageData";
import {LoginLayout} from "./LoginLayout";
import {RegistrationLayout} from "./RegistrationLayout";

function AuthLayout() {
    const {mode} = useAtom(loginPageDataAtom)
    return mode === 'login'
        ? <LoginLayout/>
        : <RegistrationLayout/>
}

export {
    AuthLayout,
}