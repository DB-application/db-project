import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {calendarActions, CalendarEvent} from "../calendar";

type PopupModeType = 'edit' | 'create'

type OpenPopupPayload = {
    mode: PopupModeType,
    event: CalendarEvent,
}

const open = declareAction<OpenPopupPayload>()
const close = declareAction()
const [showAtom, setShow] = declareAtomWithSetter('editPopup', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const modeAtom = declareAtom<PopupModeType>('edit', on => [
    on(open, (_, {mode}) => mode),
])

const [startAtom, setStart] = declareAtomWithSetter<Date>('editEvent.start', new Date(), on => {
    on(open, (_, {event}) => event.start)
})
const [endAtom, setEnd] = declareAtomWithSetter<Date>('editEvent.end', new Date(), on => [
    on(open, (_, {event}) => event.end)
])
const [titleAtom, setTitle] = declareAtomWithSetter<string>('editEvent.title', '', on => [
    on(open, (_, {event}) => event.title)
])
const [descriptionAtom, setDescription] = declareAtomWithSetter<string>('editEvent.description', '', on => [
    on(open, (_, {event}) => event.description)
])
const eventIdAtom = declareAtom('editEvent.eventId', '', on => [
    on(open, (_, {event}) => event.eventId)
])

const submit = declareAction('editEvent.submit',
    (_, store) => {
        const {
            start,
            end,
            description,
            title,
            eventId,
        } = store.getState(editEventAtom)

        store.dispatch(calendarActions.updateEvent({
            eventId,
            end,
            start,
            title,
            description,
            invitedUsers: [],
        }))
        store.dispatch(editEventActions.close())
    }
)

const removeEvent = declareAction('editEvent.remove',
    (_, store) => {
        const eventId = store.getState(eventIdAtom)
        store.dispatch(calendarActions.removeEvent(eventId))
        store.dispatch(editEventActions.close())
    }
)

const editEventAtom = combine({
    show: showAtom,
    mode: modeAtom,
    start: startAtom,
    end: endAtom,
    title: titleAtom,
    description: descriptionAtom,
    eventId: eventIdAtom,
})

const editEventActions = {
    setShow,
    open,
    close,
    setDescription,
    setEnd,
    setStart,
    setTitle,
    submit,
    removeEvent,
}

export {
    editEventAtom,
    editEventActions,
}