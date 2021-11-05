import {Portal} from "./Portal";
import React, {MutableRefObject, useRef, useState} from "react";
import {popoverHideAnimation} from "../../common/popover/popoverHideAnimation";
import {useEventHandler} from "../hooks/useEventHandler";
import styles from './PopupPortal.module.css'
import {popupHideAnimation} from "../../common/popup/popupHideAnimation";

type PropsType = {
    binding: JSX.Element,
    show: boolean,
    close: () => void,
}

type PopupLayoutProps = {
    binding: JSX.Element,
    closePopup: () => void,
}

const PopupLayout = React.forwardRef<HTMLDivElement, PopupLayoutProps>((
    {
        closePopup,
        binding,
    },
    ref,
) => {
    const popupRef = ref as MutableRefObject<HTMLDivElement|null>
    const popupLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('mouseup', popupLayerRef, event => {
        if (!event.defaultPrevented) {
            closePopup()
        }
    })

    return (
        <div ref={popupLayerRef} className={styles.popupLayer}>
            <div ref={popupRef}>
                {binding}
            </div>
        </div>
    )
})

function PopupPortal({
    show,
    binding,
    close,
}: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)
    const [hiddenComplete, setHiddenComplete] = useState(false)

    const closePopupWithAnimation = async () => {
        popupRef && popupRef.current && await popupHideAnimation(popupRef.current)
        setHiddenComplete(true)
    }

    if (!show) {
        if (hiddenComplete) {
            return null
        }
        closePopupWithAnimation()
    }
    if (hiddenComplete) {
        setHiddenComplete(false)
    }

    return (
        <Portal parentId={'popup'}>
            <PopupLayout
                binding={binding}
                closePopup={close}
                ref={popupRef}
            />
        </Portal>
    )
}

export {
    PopupPortal,
}