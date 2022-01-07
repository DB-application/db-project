import {ToastContainer} from "react-toastify";
import {useAction, useAtom} from "@reatom/react";
import {isLoadingAppAtom} from "./isLoadingApp";
import {Preloader} from "../common/preloader/Preloader";
import {App} from "./App";
import {useLayoutEffect} from "react";
import {initUserDataAction} from "../currentUser/initUser";
import {withRouter} from "react-router-dom";
import {initRouterHistory} from "../core/router/router";
import {useTranslation} from "react-i18next";
import {setTranslationFunction} from "../i18n/i18n_get";
import {setI18n} from "../i18n/language";

const AppWrapper = withRouter(({history}) => {
    const {t, i18n} = useTranslation()
    const isLoadingApp = useAtom(isLoadingAppAtom)
    const handleInitUser = useAction(initUserDataAction)

    useLayoutEffect(() => {
        initRouterHistory(history)
        handleInitUser()
    }, [handleInitUser])

    useLayoutEffect(() => {
        setTranslationFunction(t)
        setI18n(i18n)
    }, [t, i18n])

    return (
        <div>
            {
                isLoadingApp
                    ? <Preloader />
                    : <App />
            }
            <ToastContainer
                position='bottom-center'
                draggable={false}
                pauseOnHover={false}
                hideProgressBar={false}
            />
        </div>
    )
})

export {
    AppWrapper,
}