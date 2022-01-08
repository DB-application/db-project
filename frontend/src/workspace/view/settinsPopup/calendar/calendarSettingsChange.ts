import {LocalStorage, STORAGE_KEYS} from "../../../../core/localStorage/localStorage";

const CALENDAR_DEFAULT_SETTINGS = {
    STEP: 30,
    RTL: false,
    TIMESLOTS: 1,
    START_ON_MONDAY: false,
}

function getStepFromLocalStorage() {
    return LocalStorage.getValue<number>(STORAGE_KEYS.CALENDAR_STEP) || CALENDAR_DEFAULT_SETTINGS.STEP
}

function setStepInLocalStorage(step: number) {
    LocalStorage.setValue<number>(STORAGE_KEYS.CALENDAR_STEP, step)
}

function getRtlFromLocalStorage() {
    return LocalStorage.getValue<boolean>(STORAGE_KEYS.CALENDAR_RTL) || CALENDAR_DEFAULT_SETTINGS.RTL
}

function setRtlInLocalStorage(rtl: boolean) {
    LocalStorage.setValue<boolean>(STORAGE_KEYS.CALENDAR_RTL, rtl)
}

function getTimeslotsFromLocalStorage() {
    return LocalStorage.getValue<number>(STORAGE_KEYS.CALENDAR_TIMESLOTS) || CALENDAR_DEFAULT_SETTINGS.TIMESLOTS
}

function setTimeslotsInLocalStorage(timeslots: number) {
    LocalStorage.setValue<number>(STORAGE_KEYS.CALENDAR_TIMESLOTS, timeslots)
}

function getStartOnMondayFromLocalStorage() {
    return LocalStorage.getValue<boolean>(STORAGE_KEYS.START_ON_MONDAY) || CALENDAR_DEFAULT_SETTINGS.START_ON_MONDAY
}

function setStartOnMondayInLocalStorage(startOnMonday: boolean) {
    LocalStorage.setValue<boolean>(STORAGE_KEYS.START_ON_MONDAY, startOnMonday)
}

function resetCalendarSettings() {
    LocalStorage.removeValue(STORAGE_KEYS.CALENDAR_TIMESLOTS)
    LocalStorage.removeValue(STORAGE_KEYS.CALENDAR_RTL)
    LocalStorage.removeValue(STORAGE_KEYS.CALENDAR_STEP)
    LocalStorage.removeValue(STORAGE_KEYS.START_ON_MONDAY)
}

export {
    getStepFromLocalStorage,
    setStepInLocalStorage,
    setRtlInLocalStorage,
    getRtlFromLocalStorage,
    setTimeslotsInLocalStorage,
    getTimeslotsFromLocalStorage,
    resetCalendarSettings,
    getStartOnMondayFromLocalStorage,
    setStartOnMondayInLocalStorage,

    CALENDAR_DEFAULT_SETTINGS,
}