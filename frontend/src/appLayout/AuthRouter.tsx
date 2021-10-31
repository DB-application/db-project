import {useAtom} from "@reatom/react";
import {userAtom} from "../authentication/viewModel/userAtom";
import {Redirect, Switch} from "react-router-dom";
import {Router} from "../core/router/router";


function AuthRouter() {
    const user = useAtom(userAtom)

    if (!user.isAuthUser) return <Redirect to={Router.Auth.url()} />

    return (
        <Switch>
            <Redirect exact from={Router.Auth.url()} to={Router.Workspace.url()} />
        </Switch>
    )
}

export {
    AuthRouter,
}