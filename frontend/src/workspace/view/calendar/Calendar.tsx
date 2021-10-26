import {Calendar, momentLocalizer, SlotInfo} from 'react-big-calendar'
import moment from 'moment'
import * as React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import {generateUuid} from "../../../core/uuid/generateUuid";
import {useAction} from "@reatom/react";
import {calendarAtom, CalendarEvent} from "../../viewmodel/calendar/calendar";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {editEventActions} from "../../viewmodel/calendar/editPopup/editEvent";


function EventsCalendar() {
    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const handleOpenEditEventPopup = useAction(editEventActions.open)

    function handleSelect(slotInfo: SlotInfo) {
        if (typeof slotInfo.start == "string" || typeof slotInfo.end == "string") {
            return
        }
        const uid = generateUuid()

        handleOpenEditEventPopup({
            mode: 'create',
            event: {
                start: slotInfo.start,
                end: slotInfo.end,
                description: '',
                title: '',
                eventId: uid,
                invitedUsers: [],
            },
        })
    }

    function onSelectEvent(event: CalendarEvent, e: React.SyntheticEvent<HTMLElement>) {
        handleOpenEditEventPopup({
            event,
            mode: 'edit',
        })
    }
    return (
        <Calendar
            selectable
            localizer={momentLocalizer(moment)}
            events={Object.values(events)}
            onSelectSlot={handleSelect}
            onSelectEvent={onSelectEvent}
            defaultView={'week'}
            step={30}
        />
    )
}

export {
    EventsCalendar,
}