import {useAtom} from "@reatom/react";
import {userAtom} from "../authentication/viewModel/userAtom";
import {Redirect, Switch} from "react-router-dom";


function AuthRouter() {
    const user = useAtom(userAtom)

    if (!user.isAuthUser) return <Redirect to='/auth' />

    return (
        <Switch>
            <Redirect exact from='/auth' to='/workspace' />
        </Switch>
    )
}

export {
    AuthRouter,
}