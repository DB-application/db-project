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
import {viewEventActions, viewEventAtom} from "../../viewmodel/calendar/viewPopup/viewEvent";
import {ViewEventPopup} from "./viewPopup/ViewEventPopup";
import {inviteUsersPopupActions, inviteUsersPopupAtom} from "../../viewmodel/calendar/inviteUsers/inviteUsers";
import {InviteUsersPopup} from "./inviteUsersPopup/InviteUsersPopup";

function PopupsLayer() {
    const showEditEvent = useAtomWithSelector(editEventAtom, x => x.show)
    const showViewEvent = useAtomWithSelector(viewEventAtom, x => x.opened)
    const showInviteUsers = useAtomWithSelector(inviteUsersPopupAtom, x => x.show)
    const handleCloseEditEventPopup = useAction(editEventActions.close)
    const handleCloseViewEventPopup = useAction(viewEventActions.close)
    const handleCloseInviteUsersPopup = useAction(inviteUsersPopupActions.close)

    return (
        <>
            <PopupPortal
                show={showEditEvent}
                close={handleCloseEditEventPopup}
                binding={<EditEventPopup/>}
            />
            <PopupPortal
                show={showViewEvent}
                close={handleCloseViewEventPopup}
                binding={<ViewEventPopup/>}
            />
            <PopupPortal
                show={showInviteUsers}
                close={handleCloseInviteUsersPopup}
                binding={<InviteUsersPopup/>}
            />
        </>
    )
}


function CalendarWrapper() {
    const calendarLoading = useAtomWithSelector(calendarAtom, x => x.calendarLoading)
    const handleInitCalendar = useAction(initCalendar)

    useEffect(() => {
        handleInitCalendar()
    }, [handleInitCalendar])

    const content = calendarLoading
        ? <Preloader/>
        : <EventsCalendar />

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