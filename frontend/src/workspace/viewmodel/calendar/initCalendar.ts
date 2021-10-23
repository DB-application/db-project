import {declareAction} from "@reatom/core";
import {calendarActions} from "./calendar";


const initCalendar = declareAction(
    (_, store) => {
        setTimeout(() => {
            store.dispatch(calendarActions.setCalendarLoading(true))
        }, 1500)
    }
)

export {
    initCalendar,
}