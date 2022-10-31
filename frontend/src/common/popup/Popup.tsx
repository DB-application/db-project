import React, {useRef} from "react";
import styles from './Popup.module.css'
import {ButtonText} from "../button/ButtonText";
import {ButtonIcon} from "../button/ButtonIcon";
import {CrossIcon} from "../../icons/CrossIcon";
import {useEventHandler} from "../../core/hooks/useEventHandler";
import {I18n_get} from "../../i18n/i18n_get";

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
    extraButton?: JSX.Element,
    closePopup: () => void,
}

type PopupWithHeaderAndFooterProps = {
    type: 'withHeaderAndFooter',
    headerText: string,
    content: JSX.Element,
    acceptButton: JSX.Element,
    extraButton?: JSX.Element,
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
    extraButton?: JSX.Element
    closePopup: () => void,
}

function PopupHeader({
    headerText,
    closePopup,
}: PopupHeaderProps) {
    return (
        <div className={styles.popupHeader}>
            <div className={styles.popupTitle}>{headerText}</div>
            <ButtonIcon
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
    extraButton,
}: PopupFooterProps) {
    return (
        <div className={styles.popupFooter}>
            <ButtonText
                onClick={closePopup}
                text={I18n_get('Common.Cancel')}
                style={'secondary'}
            />
            <div className={styles.generalButtons}>
                {extraButton}
                {acceptButton}
            </div>
        </div>
    )
}

function Popup(props: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('click', popupRef, event => {
        event.preventDefault()
    })

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
                extraButton={props.extraButton}
                acceptButton={props.acceptButton}
            />}
        </div>
    )
}

export {
    Popup,
}