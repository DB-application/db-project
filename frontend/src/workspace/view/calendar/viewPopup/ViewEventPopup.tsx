import {useAction, useAtom} from "@reatom/react";
import {viewEventActions, viewEventAtom} from "../../../viewmodel/calendar/viewPopup/viewEvent";
import {Popup} from "../../../../common/popup/Popup";
import styles from './ViewEventPopup.module.css'
import { I18n_get } from "../../../../i18n/i18n_get";

function Content() {
    const {
        title,
        start,
        end,
        description
    } = useAtom(viewEventAtom)

    const getDateString = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.infoLabel}>
                {I18n_get('ViewEventPopup.InfoLabel')}
            </div>
            <div className={styles.eventTitleContainer}>
                <div className={styles.titleLabel}>
                    {I18n_get('ViewEventPopup.TitleLabel')}:
                </div>
                <div className={styles.eventTitle}>
                    {title}
                </div>
            </div>
            <div className={styles.timeContainer}>
                <div className={styles.whenTitle}>
                    {I18n_get('ViewEventPopup.WhenLabel')}:
                </div>
                <div className={styles.range}>
                    {getDateString(start)} - {getDateString(end)}
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionLabel}>
                    {I18n_get('ViewEventPopup.Description')}:
                </div>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
        </div>
    )
}

function ViewEventPopup() {
    const handleViewEventPopup = useAction(viewEventActions.close)

    return <Popup
        type={"contentOnly"}
        content={<Content />}
        closePopup={handleViewEventPopup}
    />
}

export {
    ViewEventPopup
}