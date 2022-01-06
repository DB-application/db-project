import {Portal} from "./Portal";
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import styles from './PopupPortal.module.css'
import {popupAppearAnimation, popupHideAnimation} from "../../common/popup/popupHideAnimation";
import {verify} from "../verify";
import {addToStack, appearPreviousPopup, hiddenPreviousPopup, removeFromStack} from "./popupStack";
import {useHtmlElementEventHandler} from "../hooks/useHtmlElementEventHandler";
import {hideLowerLayers} from "../layers/externalLayers";
import { useCloseLayer } from "./useCloseLayer";

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

    useHtmlElementEventHandler('keydown', document.body, event => {
        const keyboardEvent = event as KeyboardEvent
        if (keyboardEvent.keyCode === 27) {
            closePopup()
        }
    })

    useCloseLayer(popupRef, popupLayerRef, closePopup)

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
    const [appearComplete, setAppearComplete] = useState(false)

    const closePopupWithAnimation = useCallback(async () => {
        popupRef && popupRef.current && await popupHideAnimation(popupRef.current)
        setHiddenComplete(true)
        setAppearComplete(false)
        removeFromStack()
        appearPreviousPopup()
    }, [popupRef, setAppearComplete, setHiddenComplete])

    const openPopup = useCallback(async () => {
        hideLowerLayers('popup')
        addToStack(popupRef)
        hiddenPreviousPopup()
            .then(() => {
                popupAppearAnimation(verify(popupRef.current))
                    .then(() => setAppearComplete(true))
            })
    }, [popupRef, setAppearComplete])

    useEffect(() => {
        if (show && popupRef.current && !appearComplete) {
            openPopup()
        }
    }, [show, popupRef])

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