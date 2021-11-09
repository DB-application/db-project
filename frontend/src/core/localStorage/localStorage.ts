import {get, set} from "local-storage";

type StorageKey = 'calendarDefaultView'

type StorageKeys = {
    [item: string]: StorageKey,
}

const STORAGE_KEYS: StorageKeys = {
    CALENDAR_DEFAULT_VIEW: 'calendarDefaultView',
}

function setValue<T>(key: StorageKey, value: T) {
    set(key, value)
}

function getValue<T>(key: StorageKey): T {
    return get(key)
}

const LocalStorage = {
    setValue,
    getValue,
}

export {
    LocalStorage,
    STORAGE_KEYS,
}