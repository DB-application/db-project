import Popup from "reactjs-popup"
import { PopupPosition } from "reactjs-popup/dist/types"
import React, {CSSProperties} from "react";


type TooltipProps = {
    tooltipContent: JSX.Element,
    className: string,
    element: JSX.Element,
    positions: Array<PopupPosition>,
    contentStyle: CSSProperties,
    overlayStyle: CSSProperties,
}

function ElementWithTooltip({
    tooltipContent,
    className,
    element,
    positions,
    contentStyle,
    overlayStyle,
}: TooltipProps) {

    return (
        <Popup
            trigger={element}
            on={['hover', 'focus']}
            className={className}
            position={positions}
            contentStyle={contentStyle}
            overlayStyle={overlayStyle}
        >
            {tooltipContent}
        </Popup>
    )
}

export {
    ElementWithTooltip,
}