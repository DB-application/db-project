import ReactDOM from "react-dom";

type LayerType = 'popup'|'popover'|'tooltip'

type LayersType = {
    [item: string]: HTMLDivElement,
}

const layers: LayersType = {}
const layersOrder: Array<LayerType> = ['tooltip', 'popover', 'popup']

function initExternalLayer(layerType: LayerType) {
    const layer = document.createElement('div')
    layer.setAttribute('id', layerType)
    layer.className = 'external-layer'
    layers[layerType] = layer
    document.body.append(layer)
}

function getExternalLayer(layerType: LayerType) {
    return layers[layerType]
}

function cleanExternalLayer(layerType: LayerType) {
    const layer = getExternalLayer(layerType)
    if (layer.hasChildNodes())
    {
        ReactDOM.unmountComponentAtNode(layer)
    }
}

function hideLowerLayers(layerType: LayerType) {
    const layerOrder = layersOrder.findIndex(layer => layer === layerType)
    for(let i = 0; i < layerOrder; i++)
    {
        cleanExternalLayer(layersOrder[i])
    }
}

export {
    initExternalLayer,
    hideLowerLayers,
    getExternalLayer,
    cleanExternalLayer,
}

export type {
    LayerType,
}