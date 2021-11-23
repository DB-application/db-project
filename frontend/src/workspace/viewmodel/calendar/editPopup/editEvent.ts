import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {authorizedCurrentUser} from "../../../../authentication/viewModel/currentUserAtom";
import {createEventAction} from "../createEvent";
import {editEventAction} from "../editEvent";
import {removeEventAction} from "../removeEvent";
import {toast} from "react-toastify";
import {I18n_get} from "../../../../i18n/i18n_get";
import {loadAbsentUsers} from "../../../../users/loadUsers";
import {dispatchAsyncAction} from "../../../../core/reatom/dispatchAsyncAction";
import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";

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
    place: string;
    invitedUsersIds: Array<string>;
}

const loadInvitedUsers = declareAsyncAction<Array<string>, void>('editEvent.loadInvitedUsers',
    async (userIds, store) => {
        return dispatchAsyncAction(store, loadAbsentUsers, userIds)
    }
)

const open = declareAsyncAction<OpenPopupPayload, void>(
    'editEvent.open',
    async (payload, store) => {
        const invitedUsers = payload.mode === 'create'
            ? []
            : payload.invitedUsersIds
        if (invitedUsers.length > 0) {
            return dispatchAsyncAction(store, loadInvitedUsers, invitedUsers)
        }
        return Promise.resolve()
    }
)

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
const [titleErrorAtom, setTitleError] = declareAtomWithSetter<boolean>('editEvent.titleError', false, on => [
    on(open, () => false),
    on(setTitle, () => false)
])
const [descriptionAtom, setDescription] = declareAtomWithSetter<string>('editEvent.description', '', on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.description : '')
])
const [placeAtom, setPlace] = declareAtomWithSetter<string>('editEvent.place', '', on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.place : '')
])
const [invitedUsersAtom, setInvitedUsersAtom] = declareAtomWithSetter<Array<string>>('editEvent.invitedUsers', [], on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.invitedUsersIds : [])
])
const eventIdAtom = declareAtom('editEvent.eventId', '', on => [
    on(open, (_, payload) => payload.mode === 'edit' ? payload.eventId : '')
])
const [allDayAtom, setAllDay] = declareAtomWithSetter('editEvent.addDay', false)

const [endErrorAtom, setEndError] = declareAtomWithSetter('editEvent.endError', false, on => [
    on(setEnd, () => false),
    on(setStart, () => false),
    on(open, () => false),
])

const submit = declareAction('editEvent.submit',
    (_, store) => {
        const event = store.getState(editEventAtom)
        const {id: currentUserId} = store.getState(authorizedCurrentUser)

        let newStart = new Date(event.start)
        let newEnd = new Date(event.end)
        if (event.allDay) {
            newStart.setHours(9)
            newStart.setMinutes(0)

            newEnd.setHours(18)
            newEnd.setMinutes(0)
        }

        if (!event.title) {
            store.dispatch(setTitleError(true))
            return
        }

        if (newStart > newEnd) {
            toast.error(I18n_get('Errors.EventStartBiggerEnd'))
            store.dispatch(setEndError(true))
            return
        }

        if (event.mode === 'create') {
            store.dispatch(createEventAction({
                end: event.end,
                title: event.title,
                start: event.start,
                description: event.description,
                organizerId: currentUserId,
                invitedUsersIds: event.invitedUsers,
                place: event.place,
            }))
        }
        else {
            store.dispatch(editEventAction({
                end: event.end,
                eventId: event.eventId,
                description: event.description,
                organizerId: currentUserId,
                start: event.start,
                title: event.title,
                invitedUsersIds: event.invitedUsers,
                place: event.place,
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
    on(open, () => true),
    on(open.done, () => false),
    on(open.fail, () => false),
    on(removeEventAction, () => true),
    on(createEventAction, () => true),
    on(editEventAction, () => true),
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
    endError: endErrorAtom,
    title: titleAtom,
    description: descriptionAtom,
    place: placeAtom,
    invitedUsers: invitedUsersAtom,
    eventId: eventIdAtom,
    allDay: allDayAtom,
    isPopupLoading: isPopupLoadingAtom,
    submitButtonState: submitButtonStateAtom,
    titleError: titleErrorAtom,
})

const editEventActions = {
    setShow,
    open,
    close,
    setDescription,
    setPlace,
    setEnd,
    setStart,
    setTitle,
    submit,
    removeEvent,
    setAllDay,
    setInvitedUsersAtom,
    setIsPopupLoading,
}

export {
    editEventAtom,
    editEventActions,
}