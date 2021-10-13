import {declareAction, declareAtom} from "@reatom/core";


const setIsLoadingApp = declareAction<boolean>()
const isLoadingAppAtom = declareAtom('app.isLoading', true, on => [
    on(setIsLoadingApp, (_, value) => value),
])

export {
    isLoadingAppAtom,
    setIsLoadingApp,
}