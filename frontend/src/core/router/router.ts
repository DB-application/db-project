import {History} from "history";

const WORKSPACE = '/workspace'
const CALENDAR = '/calendar'
const NOTE = '/note'
const CHAT = '/chat'
const PROFILE = '/profile'
const AUTH = '/auth'

let RouterHistory: History|null = null

function initRouterHistory(history: History) {
    RouterHistory = history
}

function replaceUrl(path: string, push: boolean = false) {
    if (!RouterHistory) {
        throw new Error('router not initialized')
    }
    push
        ? RouterHistory.push(path)
        : RouterHistory.replace(path)
}

function generateCalendarUrl() {
    return `${WORKSPACE}${CALENDAR}`
}
function openCalendar(push: boolean = false) {
    replaceUrl(generateCalendarUrl(), push)
}

function generateChatUrl() {
    return `${WORKSPACE}${CALENDAR}`
}
function openChat(push: boolean = false) {
    replaceUrl(generateChatUrl(), push)
}

function generateWorkspaceUrl() {
    return `${WORKSPACE}`
}
function openWorkspace(push: boolean = false) {
    replaceUrl(generateWorkspaceUrl(), push)
}

function generateNoteUrl(noteId: string) {
    return `${WORKSPACE}${NOTE}/${noteId}`
}
function openNote(noteId: string, push: boolean = false) {
    replaceUrl(generateNoteUrl(noteId), push)
}

function generateProfileUrl() {
    return `${PROFILE}`
}
function openProfile(push: boolean = false) {
    replaceUrl(generateProfileUrl(), push)
}

function generateAuthUrl() {
    return `${AUTH}`
}
function openAuth(push: boolean = false) {
    replaceUrl(generateAuthUrl(), push)
}

const Router = {
    Calendar: {
        open: openCalendar,
        url: generateCalendarUrl,
    },
    Note: {
        open: openNote,
        url: generateNoteUrl,
    },
    Profile: {
        open: openProfile,
        url: generateProfileUrl,
    },
    Workspace: {
        open: openWorkspace,
        url: generateWorkspaceUrl,
    },
    Chat: {
        open: openChat,
        url: generateChatUrl,
    },
    Auth: {
        open: openAuth,
        url: generateAuthUrl,
    }
}

export {
    initRouterHistory,
    Router,
}