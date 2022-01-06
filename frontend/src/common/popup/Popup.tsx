import React, {useRef} from "react";
import styles from './Popup.module.css'
import {Button_Text} from "../button/Button_Text";
import {Button_Icon} from "../button/Button_Icon";
import {CrossIcon} from "../../icons/CrossIcon";
import {useEventHandler} from "../../core/hooks/useEventHandler";

type PopupWithHeaderProps = {
    type: 'withHeader',
    headerText: string,
    content: JSX.Element,
    closePopup: () => void,
}

type PopupWithFooterProps = {
    type: 'withFooter',
    content: JSX.Element,
    acceptButton: JSX.Element,
    closePopup: () => void,
}

type PopupWithHeaderAndFooterProps = {
    type: 'withHeaderAndFooter',
    headerText: string,
    content: JSX.Element,
    acceptButton: JSX.Element,
    closePopup: () => void,
}

type PopupContentOnlyProps = {
    type: 'contentOnly',
    content: JSX.Element,
    closePopup: () => void,
}

type PropsType = PopupWithHeaderProps | PopupWithFooterProps | PopupWithHeaderAndFooterProps | PopupContentOnlyProps

type PopupHeaderProps = {
    headerText: string,
    closePopup: () => void,
}

type PopupFooterProps = {
    acceptButton: JSX.Element,
    closePopup: () => void,
}

function PopupHeader({
    headerText,
    closePopup,
}: PopupHeaderProps) {
    return (
        <div className={styles.popupHeader}>
            <div className={styles.popupTitle}>{headerText}</div>
            <Button_Icon
                icon={<CrossIcon/>}
                size={'small'}
                onClick={closePopup}
                style={'secondary'}
                className={styles.closeHeader}
            />
        </div>
    )
}

function PopupFooter({
    closePopup,
    acceptButton,
}: PopupFooterProps) {
    return (
        <div className={styles.popupFooter}>
            <Button_Text
                onClick={closePopup}
                text={'Отмена'}
                style={'secondary'}
            />
            {acceptButton}
        </div>
    )
}

function Popup(props: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('click', popupRef, event => {
        event.preventDefault()
    })
    // useEventHandler('mouseup', popupRef, event => {
    //     event.preventDefault()
    // })

    const withHeader = props.type === 'withHeader' || props.type === 'withHeaderAndFooter'
    const withFooter = props.type === 'withHeaderAndFooter' || props.type === 'withFooter'

    return(
        <div className={styles.popupContainer} ref={popupRef}>
            {withHeader
            && <PopupHeader
                closePopup={props.closePopup}
                headerText={props.headerText}
            />}
            {props.content}
            {withFooter
            && <PopupFooter
                closePopup={props.closePopup}
                acceptButton={props.acceptButton}
            />}
        </div>
    )
}

export {
    Popup,
}