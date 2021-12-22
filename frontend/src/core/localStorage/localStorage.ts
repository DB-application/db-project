import {get, set} from "local-storage";

type StorageKey = 'calendarDefaultView'
    | 'redirect_from'
    | 'workspaceId'

type StorageKeys = {
    [item: string]: StorageKey,
}

const STORAGE_KEYS: StorageKeys = {
    CALENDAR_DEFAULT_VIEW: 'calendarDefaultView',
    REDIRECT_FROM: 'redirect_from',
    WORKSPACE_ID: 'workspaceId',
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