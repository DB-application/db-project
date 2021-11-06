import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {context} from '@reatom/react';
import {combine, createStore,} from "@reatom/core";
import {currentUserAtom} from "./authentication/viewModel/currentUserAtom";
import {BrowserRouter as Router} from 'react-router-dom';
import {isLoadingAppAtom} from "./appLayout/isLoadingApp";
import {AppWrapper} from "./appLayout/AppWrapper";
import i18n from "./i18n";
import {initExternalLayer} from "./core/layers/externalLayers";
import {workspaceLoadingAtom} from "./workspace/viewmodel/workspaceLoading";
import {notesAtom} from "./workspace/viewmodel/notes/notes";
import {usersAtom} from "./users/usersAtom";

const store = createStore(
    combine({
        userAtom: currentUserAtom,
        isLoadingAppAtom,
        workspaceLoadingAtom,
        notesAtom,
        usersAtom,
    })
);

ReactDOM.render(
    <Suspense fallback="loading">
        <context.Provider value={store}>
            <Router>
                <AppWrapper />
            </Router>
        </context.Provider>
    </Suspense>,
    document.getElementById('root')
);

initExternalLayer("popup")
initExternalLayer("popover")
initExternalLayer("tooltip")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
