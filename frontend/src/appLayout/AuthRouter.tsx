import {useAtom} from "@reatom/react";
import {userAtom} from "../authentication/viewModel/userAtom";
import {Redirect} from "react-router-dom";


function AuthRouter() {
    const user = useAtom(userAtom)

    if (!user.isAuthUser) return <Redirect to='/auth' />

    return <Redirect to='/profile' />
}

export {
    AuthRouter,
}