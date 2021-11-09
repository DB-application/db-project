import {useAtom} from "@reatom/react";
import {currentUserAtom} from "../authentication/viewModel/currentUserAtom";
import {Redirect, Switch, useRouteMatch} from "react-router-dom";
import {Router} from "../core/router/router";
import {LocalStorage, STORAGE_KEYS} from "../core/localStorage/localStorage";
import {useLocation} from "react-router";


function AuthRouter() {
    const location = useLocation()
    const user = useAtom(currentUserAtom)

    if (!user.isAuthUser) {
        if (location.pathname == Router.Auth.url()) {
            return null
        }
        LocalStorage.setValue(STORAGE_KEYS.REDIRECT_FROM, location.pathname)
        return <Redirect to={Router.Auth.url()} />
    }

    return (
        <Switch>
            <Redirect exact from={Router.Auth.url()} to={Router.Workspace.url()} />
        </Switch>
    )
}

export {
    AuthRouter,
}