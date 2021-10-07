import './App.css';
import {LoginLayout} from "./authentication/view/LoginLayout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <LoginLayout/>
            <ToastContainer
                position='bottom-center'
                draggable={false}
                pauseOnHover={false}
                hideProgressBar={false}
            />
        </div>
    )
}

export {
    App,
}