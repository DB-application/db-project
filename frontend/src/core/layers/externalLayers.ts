import {verify} from "../verify";
import {joinClassNames} from "../styles/joinClassNames";
import {Signal} from "../../common/signals/Signal";

type LayerType = 'popup'|'popover'|'tooltip'

type LayersType = {
    [item: string]: HTMLDivElement,
}

const layers: LayersType = {}
const layersOrder: Array<LayerType> = ['tooltip', 'popover', 'popup']

const closePopoverSignal = new Signal<void>()
const closeTooltipSignal = new Signal<void>()
const closePopupSignal = new Signal<void>()

const layerTypeToClassname = {
    'tooltip': 'tooltip-layer',
    'popup': 'popup-layer',
    'popover': 'popover-layer',
}

const layerTypeToCloseSignal = {
    'tooltip': closeTooltipSignal,
    'popup': closePopupSignal,
    'popover': closePopoverSignal,
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
    layerTypeToCloseSignal[layerType].dispatch()
}

function foreachLowerLayers(layerType: LayerType, fn: (layerType: LayerType) => void) {
    const layerOrder = layersOrder.findIndex(layer => layer === layerType)
    for(let i = 0; i < layerOrder; i++)
    {
        fn(layersOrder[i])
    }
}

function hideLowerLayers(layerType: LayerType) {
    foreachLowerLayers(layerType, cleanExternalLayer)
}

export {
    initExternalLayer,
    hideLowerLayers,
    getExternalLayer,
    cleanExternalLayer,
    foreachLowerLayers,
    closePopoverSignal,
    closePopupSignal,
    closeTooltipSignal,
}

export type {
    LayerType,
}