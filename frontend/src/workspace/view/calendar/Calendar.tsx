import {Calendar, momentLocalizer, SlotInfo, Views} from 'react-big-calendar'
import moment from 'moment'
// @ts-ignore
import 'moment/locale/ru'
import * as React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import {useAction, useAtom} from "@reatom/react";
import {calendarAtom, CalendarEvent} from "../../viewmodel/calendar/calendar";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {editEventActions} from "../../viewmodel/calendar/editPopup/editEvent";
import {viewEventActions} from "../../viewmodel/calendar/viewPopup/viewEvent";
import {authorizedCurrentUser} from "../../../authentication/viewModel/currentUserAtom";
import {LocalStorage, STORAGE_KEYS} from "../../../core/localStorage/localStorage";
import {getRepeatableEvents} from './repeatableEvents';
import {languageAtom} from "../../../appLayout/language";
import {I18n_get} from "../../../i18n/i18n_get";
import {LANGUAGE} from "../../../i18n/language";
import {useLayoutEffect} from "react";

function getAllEvents(events: Array<CalendarEvent>) {
    return events.reduce((accumulate: Array<CalendarEvent>, event) => {
        return event.repeatable !== 'none'
            ? accumulate.concat(getRepeatableEvents(event))
            : accumulate.concat([event])
    }, [])
}

function EventsCalendar() {
    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const currentUserId = useAtomWithSelector(authorizedCurrentUser, x => x.id)
    const calendarSettings = useAtomWithSelector(calendarAtom, x => x.calendarSettings)
    const language = useAtom(languageAtom)
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
    moment.locale(
        calendarSettings.startOnMonday
            ? LANGUAGE.RU
            : LANGUAGE.EN
    )

    return (
        <Calendar
            selectable
            localizer={momentLocalizer(moment)}
            events={getAllEvents(Object.values(events))}
            culture={language}
            onSelectSlot={handleSelect}
            onSelectEvent={onSelectEvent}
            defaultView={LocalStorage.getValue(STORAGE_KEYS.CALENDAR_DEFAULT_VIEW) || Views.WEEK}
            onView={view => LocalStorage.setValue(STORAGE_KEYS.CALENDAR_DEFAULT_VIEW, view)}
            tooltipAccessor={event => event.title}
            showMultiDayTimes={true}
            popup={true}
            step={calendarSettings.step}
            rtl={calendarSettings.rtl}
            timeslots={calendarSettings.timeslots}
            views={[Views.MONTH, Views.WEEK, Views.WORK_WEEK, Views.DAY, Views.AGENDA]}
            messages={{
                today: I18n_get('Calendar.Today'),
                previous: I18n_get('Calendar.Back'),
                next: I18n_get('Calendar.Next'),
                month: I18n_get('Calendar.Month'),
                week: I18n_get('Calendar.Week'),
                work_week: I18n_get('Calendar.WorkWeek'),
                day: I18n_get('Calendar.Day'),
                agenda: I18n_get('Calendar.Agenda'),
                noEventsInRange: I18n_get('Calendar.NoEvents'),
                date: I18n_get('Calendar.Date'),
                time: I18n_get('Calendar.Time'),
                event: I18n_get('Calendar.Event'),
                tomorrow: I18n_get('Calendar.Tomorrow'),
                yesterday: I18n_get('Calendar.Yesterday'),
                showMore: (count) => I18n_get('Calendar.More', {'count': count})
            }}
        />
    )
}

export {
    EventsCalendar,
}