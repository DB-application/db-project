import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {authorizedUser} from "../../../../authentication/viewModel/userAtom";
import {createEventAction} from "../createEvent";
import {editEventAction} from "../editEvent";
import {removeEventAction} from "../removeEvent";
import {toast} from "react-toastify";
import {I18n_get} from "../../../../i18n/i18n_get";

type PopupModeType = 'edit' | 'create'

type OpenPopupPayload = {
    mode: 'create',
    start: Date;
    end: Date;
} | {
    mode: 'edit',
    eventId: string,
    title: string;
    description: string,
    start: Date;
    end: Date;
    organizerId: string;
    invitedUsersIds: Array<string>;
}

const open = declareAction<OpenPopupPayload>()
const close = declareAction()
const [showAtom, setShow] = declareAtomWithSetter('editEvent.show', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(createEventAction.done, () => false),
    on(editEventAction.done, () => false),
    on(removeEventAction.done, () => false),
])

const modeAtom = declareAtom<PopupModeType>('edit', on => [
    on(open, (_, {mode}) => mode),
])

const [startAtom, setStart] = declareAtomWithSetter<Date>('editEvent.start', new Date(), on => {
    on(open, (_, {start}) => start)
})
const [endAtom, setEnd] = declareAtomWithSetter<Date>('editEvent.end', new Date(), on => [
    on(open, (_, {end}) => end)
])
const [titleAtom, setTitle] = declareAtomWithSetter<string>('editEvent.title', '', on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.title : '')
])
const [descriptionAtom, setDescription] = declareAtomWithSetter<string>('editEvent.description', '', on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.description : '')
])
const eventIdAtom = declareAtom('editEvent.eventId', '', on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.eventId : '')
])
const [allDayAtom, setAllDay] = declareAtomWithSetter('editEvent.addDay', false)

const submit = declareAction('editEvent.submit',
    (_, store) => {
        const {
            start,
            end,
            description,
            title,
            eventId,
            allDay,
            mode,
        } = store.getState(editEventAtom)
        const {id: currentUserId} = store.getState(authorizedUser)

        let newStart = new Date(start)
        let newEnd = new Date(end)
        if (allDay) {
            newStart.setHours(9)
            newStart.setMinutes(0)

            newEnd.setHours(18)
            newEnd.setMinutes(0)
        }

        if (newStart > newEnd) {
            toast.error(I18n_get('Errors.EventStartBiggerEnd'))
            return
        }

        if (mode === 'create') {
            store.dispatch(createEventAction({
                end,
                title,
                start,
                description,
                organizerId: currentUserId,
                invitedUsersIds: [],
            }))
        }
        else {
            store.dispatch(editEventAction({
                end,
                eventId,
                description,
                organizerId: currentUserId,
                start,
                title,
                invitedUsersIds: [],
            }))
        }
    }
)

const removeEvent = declareAction('editEvent.remove',
    (_, store) => {
        const eventId = store.getState(eventIdAtom)
        store.dispatch(removeEventAction(eventId))
    }
)

const [isPopupLoadingAtom, setIsPopupLoading] = declareAtomWithSetter('editEvent.popupLoading', false, on => [
    on(close, () => false),
    on(removeEventAction, () => true),
    on(createEventAction, () => true),
    on(createEventAction.done, () => false),
    on(createEventAction.fail, () => false),
    on(editEventAction.done, () => false),
    on(editEventAction.fail, () => false),
    on(removeEventAction.done, () => false),
    on(removeEventAction.fail, () => false),
])

const submitButtonStateAtom = map(
    combine({
        isPopupLoading: isPopupLoadingAtom,
    }),
    ({isPopupLoading}) => {
        return isPopupLoading
            ? 'preloader'
            : 'normal'
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
    allDay: allDayAtom,
    isPopupLoading: isPopupLoadingAtom,
    submitButtonState: submitButtonStateAtom,
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
    setAllDay,
    setIsPopupLoading,
}

export {
    editEventAtom,
    editEventActions,
}