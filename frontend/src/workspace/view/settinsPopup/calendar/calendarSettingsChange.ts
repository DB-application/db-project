import {LocalStorage, STORAGE_KEYS} from "../../../../core/localStorage/localStorage";
import {Signal} from "../../../../common/signals/Signal";

const changeStepSignal = new Signal<void>()
const changeRtlSignal = new Signal<void>()
const changeTimeslotsSignal = new Signal<void>()

function getStepFromLocalStorage() {
    return LocalStorage.getValue<number>(STORAGE_KEYS.CALENDAR_STEP) || 30
}

function setStepInLocalStorage(step: number) {
    LocalStorage.setValue<number>(STORAGE_KEYS.CALENDAR_STEP, step)
    changeStepSignal.dispatch()
}

function getRtlFromLocalStorage() {
    return LocalStorage.getValue<boolean>(STORAGE_KEYS.CALENDAR_RTL) || false
}

function setRtlInLocalStorage(rtl: boolean) {
    LocalStorage.setValue<boolean>(STORAGE_KEYS.CALENDAR_RTL, rtl)
    changeRtlSignal.dispatch()
}

function getTimeslotsFromLocalStorage() {
    return LocalStorage.getValue<number>(STORAGE_KEYS.CALENDAR_TIMESLOTS) || 1
}

function setTimeslotsInLocalStorage(timeslots: number) {
    LocalStorage.setValue<number>(STORAGE_KEYS.CALENDAR_TIMESLOTS, timeslots)
    changeTimeslotsSignal.dispatch()
}

function resetSettings() {
    LocalStorage.removeValue(STORAGE_KEYS.CALENDAR_TIMESLOTS)
    LocalStorage.removeValue(STORAGE_KEYS.CALENDAR_RTL)
    LocalStorage.removeValue(STORAGE_KEYS.CALENDAR_STEP)

    changeTimeslotsSignal.dispatch()
    changeRtlSignal.dispatch()
    changeStepSignal.dispatch()
}

export {
    getStepFromLocalStorage,
    setStepInLocalStorage,
    setRtlInLocalStorage,
    getRtlFromLocalStorage,
    setTimeslotsInLocalStorage,
    getTimeslotsFromLocalStorage,
    resetSettings,

    changeRtlSignal,
    changeStepSignal,
    changeTimeslotsSignal,
}