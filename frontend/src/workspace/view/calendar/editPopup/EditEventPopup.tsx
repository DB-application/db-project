import styles from './EditEventPopup.module.css'
import {Popup} from "../../../../common/popup/Popup";
import {Button_Text} from "../../../../common/button/Button_Text";
import {useAction} from "@reatom/react";
import {editEventActions} from '../../../viewmodel/calendar/editPopup/editEvent';

function Content() {

    return (
        <div className={styles.container}>

        </div>
    )
}

function EditEventPopup() {
    const handleClosePopup = useAction(editEventActions.close)

    return <Popup
        headerText={'Редактирование события'}
        content={<Content />}
        acceptButton={<Button_Text
            text={'Применить'}
            onClick={handleClosePopup}
        />}
        closePopup={handleClosePopup}
    />
}

export {
    EditEventPopup,
}