import React, {RefObject, useEffect, useRef, useState} from "react";
import {Portal} from "./Portal";
import {PopoverContainer} from "../../common/popover/PopoverContainer";
import {PopoverAlign, PopoverSide} from "../../common/popover/getPopoverPosition";
import {popoverAppearAnimation, popoverHideAnimation} from "../../common/popover/popoverHideAnimation";
import {useAppearPopover} from "./useAppearPopover";

interface IProps {
    elementRef: RefObject<any>,
    nestedPopoverRef?: RefObject<any>,
    show: boolean,
    setShow: (show: boolean) => void,
    content: JSX.Element,
    align?: PopoverAlign,
    side?: PopoverSide,
}

function PopoverPortal({
    elementRef,
    show,
    setShow,
    content,
    align = 'center',
    side = 'bottom',
}: IProps ) {
    const popoverRef = useRef<HTMLDivElement|null>(null)
    const [hiddenComplete, setHiddenComplete] = useState(false)

    useEffect(() => {
        return () => setHiddenComplete(false)
    }, [setHiddenComplete])

    const closePopover = async () => {
        popoverRef && popoverRef.current && await popoverHideAnimation(popoverRef.current)
        setHiddenComplete(true)
    }
    useAppearPopover(show, elementRef, popoverRef, align, side, popoverAppearAnimation)
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
            children={<PopoverContainer
                control={elementRef}
                content={content}
                closePopover={() => {
                    setShow(false)
                }}
                align={align}
                side={side}
                ref={popoverRef}
            />}
            parentId={'popover'}
        />
    )
}

export {
    PopoverPortal,
}