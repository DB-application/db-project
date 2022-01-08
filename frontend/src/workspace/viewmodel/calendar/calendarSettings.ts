import {combine, declareAction, declareAtom} from "@reatom/core";
import {
    CALENDAR_DEFAULT_SETTINGS,
    getRtlFromLocalStorage, getStartOnMondayFromLocalStorage,
    getStepFromLocalStorage,
    getTimeslotsFromLocalStorage, resetCalendarSettings,
    setRtlInLocalStorage, setStartOnMondayInLocalStorage,
    setStepInLocalStorage,
    setTimeslotsInLocalStorage
} from "../../view/settinsPopup/calendar/calendarSettingsChange";

const resetSettings = declareAction('calendarSettings.resetSettings', () => resetCalendarSettings())

const setStep = declareAction<number>(
    'calendarSettings.setStep',
    (step) => setStepInLocalStorage(step)
)
const stepAtom = declareAtom('calendarSettings.step', getStepFromLocalStorage(), on => [
    on(setStep, (_, value) => value),
    on(resetSettings, () => CALENDAR_DEFAULT_SETTINGS.STEP),
])

const setRtl = declareAction<boolean>(
    'calendarSettings.setRtl',
    (rtl) => setRtlInLocalStorage(rtl)
)
const rtlAtom = declareAtom('calendarSettings.rtl', getRtlFromLocalStorage(), on => [
    on(setRtl, (_, value) => value),
    on(resetSettings, () => CALENDAR_DEFAULT_SETTINGS.RTL),
])

const setTimeslots = declareAction<number>(
    'calendarSettings.setTimeslots',
    (timeslots) => setTimeslotsInLocalStorage(timeslots)
)
const timeslotsAtom = declareAtom('calendarSettings.timeslots', getTimeslotsFromLocalStorage(), on => [
    on(setTimeslots, (_, value) => value),
    on(resetSettings, () => CALENDAR_DEFAULT_SETTINGS.TIMESLOTS),
])

const setStartOnMonday = declareAction<boolean>(
    'calendarSettings.setStartOnMonday',
    (startOnMonday) => setStartOnMondayInLocalStorage(startOnMonday)
)
const startOnMondayAtom = declareAtom('calendarSettings.startOnMonday', getStartOnMondayFromLocalStorage(), on => [
    on(setStartOnMonday, (_, value) => value),
])

const calendarSettingsAtom = combine({
    step: stepAtom,
    rtl: rtlAtom,
    timeslots: timeslotsAtom,
    startOnMonday: startOnMondayAtom,
})

const calendarSettingsAction = {
    setTimeslots,
    setRtl,
    setStep,
    setStartOnMonday,
    resetSettings,
}

export {
    calendarSettingsAtom,
    calendarSettingsAction,
}