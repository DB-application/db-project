import ReactDOM from "react-dom";
import {verify} from "../verify";
import {joinClassNames} from "../styles/joinClassNames";

type LayerType = 'popup'|'popover'|'tooltip'

type LayersType = {
    [item: string]: HTMLDivElement,
}

const layers: LayersType = {}
const layersOrder: Array<LayerType> = ['tooltip', 'popover', 'popup']
const layerTypeToClassname = {
    'tooltip': 'tooltip-layer',
    'popup': 'popup-layer',
    'popover': 'popover-layer',
}

function initExternalLayer(layerType: LayerType) {
    const layer = document.createElement('div')
    layer.setAttribute('id', layerType)
    layer.className = joinClassNames('external-layer', layerTypeToClassname[layerType])
    layers[layerType] = layer
    const root = verify(document.getElementById('root'))
    root.append(layer)
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