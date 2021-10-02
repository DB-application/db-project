import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import i18n from "./i18n"
import { context } from '@reatom/react';
import {createStore, } from "@reatom/core";
import {userAtom} from "./authentication/viewModel/userAtom";

const store = createStore(userAtom);

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="loading">
            <context.Provider value={store}>
                <App />
            </context.Provider>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
