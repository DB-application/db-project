import {Calendar, momentLocalizer, SlotInfo} from 'react-big-calendar'
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
import {getRepeatableEvents} from './repeatableEvents';
import {useEffect, useState} from "react";
import {
    changeRtlSignal,
    changeStepSignal, changeTimeslotsSignal,
    getRtlFromLocalStorage,
    getStepFromLocalStorage,
    getTimeslotsFromLocalStorage
} from "../settinsPopup/calendar/calendarSettingsChange";

function getAllEvents(events: Array<CalendarEvent>) {
    return events.reduce((accumulate: Array<CalendarEvent>, event) => {
        return event.repeatable !== 'none'
            ? accumulate.concat(getRepeatableEvents(event))
            : accumulate.concat([event])
    }, [])
}

function EventsCalendar() {
    const [step, setStep] = useState<number>(getStepFromLocalStorage())
    const [rtl, setRtl] = useState<boolean>(getRtlFromLocalStorage())
    const [timeslots, setTimeSlots] = useState<number>(getTimeslotsFromLocalStorage())

    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const currentUserId = useAtomWithSelector(authorizedCurrentUser, x => x.id)
    const handleOpenEditEventPopup = useAction(editEventActions.open)
    const handleOpenViewEventPopup = useAction(viewEventActions.open)

    useEffect(() => {
        const stepsUnsub = changeStepSignal.add(() => setStep(getStepFromLocalStorage()))
        const rtlUnsub = changeRtlSignal.add(() => setRtl(getRtlFromLocalStorage()))
        const timeslotsUnsub = changeTimeslotsSignal.add(() => setTimeSlots(getTimeslotsFromLocalStorage()))
        return () => {
            stepsUnsub()
            rtlUnsub()
            timeslotsUnsub()
        }
    }, [])

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
            events={getAllEvents(Object.values(events))}
            onSelectSlot={handleSelect}
            onSelectEvent={onSelectEvent}
            defaultView={LocalStorage.getValue(STORAGE_KEYS.CALENDAR_DEFAULT_VIEW) || 'week'}
            onView={view => LocalStorage.setValue(STORAGE_KEYS.CALENDAR_DEFAULT_VIEW, view)}
            tooltipAccessor={event => event.title}
            showMultiDayTimes={true}
            step={step}
            rtl={rtl}
            timeslots={timeslots}
            views={['month', 'week', 'work_week', 'day', 'agenda']}
        />
    )
}

export {
    EventsCalendar,
}