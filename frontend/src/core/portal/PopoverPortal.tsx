import React, {RefObject} from "react";
import {Portal} from "./Portal";
import {PopoverContainer, PopoverAlign} from "../../common/popover/PopoverContainer";
import {verify} from "../verify";
import {useHtmlElementEventHandler} from "../hooks/useHtmlElementEventHandler";

interface IProps {
    elementRef: RefObject<any>,
    show: boolean,
    setShow: (show: boolean) => void,
    content: JSX.Element,
    align?: PopoverAlign,
}

function PopoverPortal({
    elementRef,
    show,
    setShow,
    content,
    align,
}: IProps ) {
    const root = verify(document.getElementById('root'))

    useHtmlElementEventHandler('mousedown', root,  (event) => {
        if (!event.defaultPrevented && show) {
            setShow(false)
        }
    })

    if (!show) {
        return null
    }

    return (
        <Portal
            children={<PopoverContainer
                control={elementRef}
                content={content}
                closePopover={() => setShow(false)}
                align={align}
            />}
            parentId={'popover'}
        />
    )
}

export {
    PopoverPortal,
}