import {ToastContainer} from "react-toastify";
import {useAction, useAtom} from "@reatom/react";
import {isLoadingAppAtom} from "./isLoadingApp";
import {Preloader} from "../common/preloader/Preloader";
import {App} from "./App";
import {useLayoutEffect} from "react";
import {initUserDataAction} from "../user/initUser";
import {useTranslation} from "react-i18next";
import {setTranslationFunction} from "../i18n/i18n_get";
import {initExternalLayer} from "../core/layers/externalLayers";

function AppWrapper() {
    const {t} = useTranslation()
    const isLoadingApp = useAtom(isLoadingAppAtom)
    const handleInitUser = useAction(initUserDataAction)

    useLayoutEffect(() => {
        setTranslationFunction(t)

        initExternalLayer("popup")
        initExternalLayer("popover")
        initExternalLayer("tooltip")

        handleInitUser()
    }, [t, handleInitUser])

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
}

export {
    AppWrapper,
}