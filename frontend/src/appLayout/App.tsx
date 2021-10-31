import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ProfileSettingsPage} from "../profile/view/ProfileSettingsPage";
import {AuthLayout} from "../authentication/view/AuthLayout";
import {AuthRouter} from './AuthRouter';
import {WorkspaceLayout} from "../workspace/view/WorkspaceLayout";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from "../core/router/router";

function App() {
    return (
        <div>
            <AuthRouter />
            <Switch>
                <Redirect exact from={'/'} to={Router.Auth.url()}/>
                <Route exact path={[Router.Auth.url()]} >
                    <AuthLayout />
                </Route>
                <Route exact path={[Router.Profile.url()]}>
                    <ProfileSettingsPage />
                </Route>
                <Route path={[Router.Workspace.url()]}>
                    <WorkspaceLayout />
                </Route>
            </Switch>
        </div>
    )
}

export {
    App,
}