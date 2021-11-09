import {Calendar, momentLocalizer, SlotInfo, View} from 'react-big-calendar'
import moment from 'moment'
import * as React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import {useAction} from "@reatom/react";
import {calendarAtom, CalendarEvent} from "../../viewmodel/calendar/calendar";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {editEventActions} from "../../viewmodel/calendar/editPopup/editEvent";
import {viewEventActions} from "../../viewmodel/calendar/viewPopup/viewEvent";
import {authorizedCurrentUser} from "../../../authentication/viewModel/currentUserAtom";
import {LocalStorage, STORAGE_KEYS} from "../../../core/localStorage/localStorage";


function EventsCalendar() {
    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const currentUserId = useAtomWithSelector(authorizedCurrentUser, x => x.id)
    const handleOpenEditEventPopup = useAction(editEventActions.open)
    const handleOpenViewEventPopup = useAction(viewEventActions.open)

    function handleSelect(slotInfo: SlotInfo) {
        if (typeof slotInfo.start == "string" || typeof slotInfo.end == "string") {
            return
        }
        handleOpenEditEventPopup({
            mode: 'create',
            start: slotInfo.start,
            end: slotInfo.end,
        })
    }

    function onSelectEvent(event: CalendarEvent, e: React.SyntheticEvent<HTMLElement>) {
        if (event.organizerId === currentUserId) {
            handleOpenEditEventPopup({
                ...event,
                mode: 'edit',
            })
        }
        else {
            handleOpenViewEventPopup({
                event
            })
        }
    }
    return (
        <Calendar
            selectable
            localizer={momentLocalizer(moment)}
            events={Object.values(events)}
            onSelectSlot={handleSelect}
            onSelectEvent={onSelectEvent}
            defaultView={LocalStorage.getValue(STORAGE_KEYS.CALENDAR_DEFAULT_VIEW) || 'week'}
            onView={view => LocalStorage.setValue(STORAGE_KEYS.CALENDAR_DEFAULT_VIEW, view)}
            step={30}
        />
    )
}

export {
    EventsCalendar,
}