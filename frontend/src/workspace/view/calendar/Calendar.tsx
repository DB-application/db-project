import {Calendar, Event, momentLocalizer, SlotInfo} from 'react-big-calendar'
import moment from 'moment'
import * as React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import {generateUuid} from "../../../core/uuid/generateUuid";
import {useAction} from "@reatom/react";
import {calendarActions, calendarAtom} from "../../viewmodel/calendar/calendar";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {editEventActions} from "../../viewmodel/calendar/editPopup/editEvent";



function EventsCalendar() {
    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const handleOpenEditEventPopup = useAction(editEventActions.open)
    const handleUpdateEvent = useAction(calendarActions.updateEvent)
    const handleRemoveEvent = useAction(calendarActions.removeEvent)

    function handleSelect(slotInfo: SlotInfo) {
        const title = window.prompt('New Event name')
        if (typeof slotInfo.start == "string" || typeof slotInfo.end == "string" || !title) {
            return
        }
        const uid = generateUuid()
        handleUpdateEvent({
            start: slotInfo.start,
            end: slotInfo.end,
            title: title || '',
            eventId: uid,
            invitedUsers: [],
        })
    }

    function onSelectEvent(event: Event, e: React.SyntheticEvent<HTMLElement>) {
        console.log('event', event)
        console.log('e', e)
        handleOpenEditEventPopup()
    }
    return (
        <Calendar
            selectable
            localizer={momentLocalizer(moment)}
            events={Object.values(events)}
            onSelectSlot={handleSelect}
            onSelectEvent={onSelectEvent}
        />
    )
}

export {
    EventsCalendar,
}