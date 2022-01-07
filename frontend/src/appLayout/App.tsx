import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {AuthLayout} from "../authentication/view/AuthLayout";
import {AuthRouter} from './AuthRouter';
import {WorkspaceLayout} from "../workspace/view/WorkspaceLayout";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from "../core/router/router";

function App() {
    return (
        <>
            <AuthRouter />
            <Switch>
                <Redirect exact from={'/'} to={Router.Auth.url()}/>
                <Route exact path={[Router.Auth.url()]} >
                    <AuthLayout />
                </Route>
                <Route path={[Router.Workspace.url()]}>
                    <WorkspaceLayout />
                </Route>
            </Switch>
        </>
    )
}

export {
    App,
}