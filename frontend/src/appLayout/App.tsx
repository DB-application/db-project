import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ProfileSettingsPage} from "../profile/view/ProfileSettingsPage";
import {AuthLayout} from "../authentication/view/AuthLayout";
import {AuthRouter} from './AuthRouter';
import {WorkspaceLayout} from "../workspace/view/WorkspaceLayout";
import {Redirect, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <div>
            <AuthRouter />
            <Switch>
                <Redirect exact from={'/'} to={'/auth'}/>
                <Route exact path={["/auth"]} >
                    <AuthLayout />
                </Route>
                <Route exact path={["/profile"]}>
                    <ProfileSettingsPage />
                </Route>
                <Route path={['/workspace']}>
                    <WorkspaceLayout />
                </Route>
            </Switch>
        </div>
    )
}

export {
    App,
}