import React, {RefObject, useRef, useState} from "react";
import {Portal} from "./Portal";
import {PopoverContainer} from "../../common/popover/PopoverContainer";
import {PopoverAlign, PopoverSide} from "../../common/popover/getPopoverPosition";
import {popoverHideAnimation} from "../../common/popover/popoverHideAnimation";
import {useEventHandler} from "../hooks/useEventHandler";

interface IProps {
    elementRef: RefObject<any>,
    show: boolean,
    setShow: (show: boolean) => void,
    content: JSX.Element,
    align?: PopoverAlign,
    side?: PopoverSide,
}

type PopoverLayerProps = {
    elementRef: RefObject<any>,
    content: JSX.Element,
    closePopover: () => void,
    align?: PopoverAlign,
    side?: PopoverSide,
}

const PopoverLayer = React.forwardRef<HTMLDivElement, PopoverLayerProps>(({
    closePopover,
    align,
    side,
    content,
    elementRef,
}, popoverRef) => {
    const popoverLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('mousedown', popoverLayerRef, e => {
        if (!e.defaultPrevented) {
            e.preventDefault()
        }
    })

    return (
        <div ref={popoverLayerRef}>
            <PopoverContainer
                control={elementRef}
                content={content}
                closePopover={closePopover}
                align={align}
                side={side}
                ref={popoverRef}
            />
        </div>
    )
})

function PopoverPortal({
    elementRef,
    show,
    setShow,
    content,
    align,
    side,
}: IProps ) {
    const popoverRef = useRef<HTMLDivElement|null>(null)
    const [hiddenComplete, setHiddenComplete] = useState(false)

    const closePopover = async () => {
        popoverRef && popoverRef.current && await popoverHideAnimation(popoverRef.current)
        setHiddenComplete(true)
    }

    if (!show) {
        if (hiddenComplete) {
            return null
        }
        closePopover()
    }
    if (hiddenComplete) {
        setHiddenComplete(false)
    }

    return (
        <Portal
            children={<PopoverLayer
                ref={popoverRef}
                content={content}
                closePopover={() => setShow(false)}
                align={align}
                side={side}
                elementRef={elementRef}
            />}
            parentId={'popover'}
        />
    )
}

export {
    PopoverPortal,
}