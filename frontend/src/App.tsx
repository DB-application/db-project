import './App.css';
import {LoginLayout} from "./authentication/view/LoginLayout";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <div>
            <LoginLayout/>
            <ToastContainer/>
        </div>
    )
}

export {
    App,
}