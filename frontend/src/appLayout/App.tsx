import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ProfileSettingsPage} from "../profile/view/ProfileSettingsPage";
import {Route, Switch} from "react-router-dom";
import {AuthLayout} from "../authentication/view/AuthLayout";

function App() {
    return (
        <Switch>
            <Route exact path={["/auth", "/"]}>
                <AuthLayout />
            </Route>
            <Route path="/profile">
                <ProfileSettingsPage />
            </Route>
        </Switch>
    )
}

export {
    App,
}