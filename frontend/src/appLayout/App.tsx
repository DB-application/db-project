import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ProfileSettingsPage} from "../profile/view/ProfileSettingsPage";
import {Route, Switch} from "react-router-dom";
import {AuthLayout} from "../authentication/view/AuthLayout";
import {AuthRouter} from './AuthRouter';

function App() {
    return (
        <div>
            <AuthRouter />
            <Switch>
                <Route exact path={["/", "/auth"]} >
                    <AuthLayout />
                </Route>
                <Route exact path={["/profile"]}>
                    <ProfileSettingsPage />
                </Route>
            </Switch>
        </div>
    )
}

export {
    App,
}