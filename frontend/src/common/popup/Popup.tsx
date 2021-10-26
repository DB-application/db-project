import React, {useRef} from "react";
import styles from './Popup.module.css'
import {Button_Text} from "../button/Button_Text";
import {Button_Icon} from "../button/Button_Icon";
import {CrossIcon} from "../../icons/CrossIcon";
import {useEventHandler} from "../../core/hooks/useEventHandler";

type PropsType = {
    headerText: string,
    content: JSX.Element,
    acceptButton: JSX.Element,
    closePopup: () => void,
}

function Popup({
    closePopup,
    acceptButton,
    headerText,
    content,
}: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)
    const popupLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('click', popupRef, event => {
        event.preventDefault()
    })
    useEventHandler('click', popupLayerRef, event => {
        if (!event.defaultPrevented) {
            closePopup()
            event.preventDefault()
        }
    })

    return(
        <div ref={popupLayerRef} className={styles.popupLayer}>
            <div className={styles.popupContainer} ref={popupRef}>
                <div className={styles.popupHeader}>
                    <div className={styles.popupTitle}>{headerText}</div>
                    <Button_Icon
                        icon={<CrossIcon/>}
                        size={'small'}
                        onClick={closePopup}
                        style={'secondary'}
                    />
                </div>
                {content}
                <div className={styles.popupFooter}>
                    <Button_Text
                        onClick={closePopup}
                        text={'Отмена'}
                        style={'secondary'}
                    />
                    {acceptButton}
                </div>
            </div>
        </div>
    )
}

export {
    Popup,
}