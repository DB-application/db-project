import {useHtmlElementEventHandler} from "../hooks/useHtmlElementEventHandler";
import {RefObject} from "react";


function useCloseLayer(popupRef: RefObject<HTMLDivElement|null>, popupLayerRef: RefObject<HTMLDivElement|null>, onClose: () => void) {
    useHtmlElementEventHandler('mousedown', document,  e => {
        const target = e.target as Node
        const popup = popupRef.current
        const popupLayer = popupLayerRef.current
        if (popupLayer && popup) {
            const isPopover = popupLayer.contains(target)
            const compareResult = target.compareDocumentPosition(popup)
            if (!(compareResult & Node.DOCUMENT_POSITION_CONTAINS)) {
                if (!isPopover || compareResult & Node.DOCUMENT_POSITION_FOLLOWING) {
                    onClose()
                }
            }
        }
    })
}

export {
    useCloseLayer,
}