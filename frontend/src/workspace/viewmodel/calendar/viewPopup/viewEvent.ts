import {combine, declareAction, declareAtom} from "@reatom/core";
import {CalendarEvent} from "../calendar";

type OpenPopupPayload = {
    event: CalendarEvent,
}

const open = declareAction<OpenPopupPayload>('viewEvent.open')
const close = declareAction('viewEvent.open')

const openedAtom = declareAtom('viewEvent.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const startAtom = declareAtom<Date>('viewEvent.start', new Date(), on => {
    on(open, (_, {event}) => event.start)
})
const endAtom = declareAtom<Date>('viewEvent.end', new Date(), on => [
    on(open, (_, {event}) => event.end)
])
const titleAtom = declareAtom<string>('viewEvent.title', '', on => [
    on(open, (_, {event}) => event.title)
])
const descriptionAtom = declareAtom<string>('viewEvent.description', '', on => [
    on(open, (_, {event}) => event.description)
])
const placeAtom = declareAtom<string>('viewEvent.place', '', on => [
    on(open, (_, {event}) => event.place)
])

const viewEventAtom = combine(({
    opened: openedAtom,
    start: startAtom,
    end: endAtom,
    title: titleAtom,
    place: placeAtom,
    description: descriptionAtom,
}))

const viewEventActions = {
    open,
    close,
}

export {
    viewEventAtom,
    viewEventActions,
}