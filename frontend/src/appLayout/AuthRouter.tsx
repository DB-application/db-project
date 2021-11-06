import {useAtom} from "@reatom/react";
import {currentUserAtom} from "../authentication/viewModel/currentUserAtom";
import {Redirect, Switch} from "react-router-dom";
import {Router} from "../core/router/router";


function AuthRouter() {
    const user = useAtom(currentUserAtom)

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