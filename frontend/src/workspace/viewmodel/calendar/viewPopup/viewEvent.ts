import {combine, declareAction, declareAtom} from "@reatom/core";
import {CalendarEvent} from "../calendar";
import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {dispatchAsyncAction} from "../../../../core/reatom/dispatchAsyncAction";
import {loadAbsentUsers} from "../../../../users/loadUsers";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";

type OpenPopupPayload = {
    event: CalendarEvent,
}

const open = declareAsyncAction<OpenPopupPayload, void>(
    'viewEvent.open',
    async (payload, store) => {
        const usersToLoad = [
            ...payload.event.invitedUsersIds,
            payload.event.organizerId,
        ]
        if (usersToLoad.length > 0) {
            return dispatchAsyncAction(store, loadAbsentUsers, usersToLoad)
        }
        return Promise.resolve()
    }
)
const close = declareAction('viewEvent.open')

const openedAtom = declareAtom('viewEvent.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const eventIdAtom = declareAtom<string>('viewEvent.eventId', '', on => {
    on(open, (_, {event}) => event.eventId)
})

const [isPopupLoadingAtom] = declareAtomWithSetter('editEvent.popupLoading', false, on => [
    on(open, () => true),
    on(open.done, () => false),
    on(open.fail, () => false),
])

const viewEventAtom = combine(({
    opened: openedAtom,
    eventId: eventIdAtom,
    isPopupLoading: isPopupLoadingAtom,
}))

const viewEventActions = {
    open,
    close,
}

export {
    viewEventAtom,
    viewEventActions,
}