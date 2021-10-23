import {calendarAtom} from "../../viewmodel/calendar/calendar";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {EventsCalendar} from "./Calendar";
import {Preloader} from "../../../common/preloader/Preloader";
import {useEffect} from "react";
import {useAction} from "@reatom/react";
import {initCalendar} from "../../viewmodel/calendar/initCalendar";
import styles from './CalendarWrapper.module.css'
import {PopupPortal} from "../../../core/portal/PopupPortal";
import {editEventActions, editEventAtom} from "../../viewmodel/calendar/editPopup/editEvent";
import {EditEventPopup} from "./editPopup/EditEventPopup";

function PopupsLayer() {
    const show = useAtomWithSelector(editEventAtom, x => x.show)
    const handleCloseEditEventPopup = useAction(editEventActions.close)

    return (
        <PopupPortal
            show={show}
            close={handleCloseEditEventPopup}
            binding={<EditEventPopup/>}
        />
    )
}


function CalendarWrapper() {
    const calendarLoading = useAtomWithSelector(calendarAtom, x => x.calendarLoading)
    const handleInitCalendar = useAction(initCalendar)

    useEffect(() => {
        handleInitCalendar()
    }, [handleInitCalendar])

    const content = calendarLoading
        ? <EventsCalendar />
        : <Preloader/>

    return (
        <div className={styles.container} >
            {content}
            <PopupsLayer />
        </div>
    )
}

export {
    CalendarWrapper,
}