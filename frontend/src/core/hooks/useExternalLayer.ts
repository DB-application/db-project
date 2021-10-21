import {useCallback, useEffect, useLayoutEffect} from "react"
import ReactDOM from "react-dom"
import {hideLowerLayers, LayerType} from "../layers/externalLayers";

type UseExternalLayerProps = {
    layerType: LayerType,
    layer: Element,
    createBinding: () => JSX.Element,
    show: boolean,
}

function useExternalLayer({
    layerType,
    layer,
    createBinding,
    show,
}: UseExternalLayerProps) {
    const cleanup = useCallback(() => {
        if (layer.hasChildNodes()) {
            ReactDOM.unmountComponentAtNode(layer)
        }
        hideLowerLayers(layerType)
    }, [layer, layerType])

    useEffect(() => cleanup, [cleanup])

    const element = show
        ? createBinding()
        : null

    useLayoutEffect(() => {
        if (element) {
            cleanup()
            ReactDOM.render(element, layer)
        }
        else {
            cleanup()
        }
    })
}

export {
    useExternalLayer,
}