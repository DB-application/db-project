import {HttpStatus} from "../core/http/HttpStatus";
import {goToAuth} from "../core/link/goToUrl";
import {CalendarEventRepeatableType} from "../workspace/viewmodel/calendar/calendar";


type EventData_Api = {
    eventId: string,
    title: string;
    description: string,
    startDate: number;
    endDate: number;
    organizerId: string;
    place: string;
    invitedUserIds: Array<string>;
}

function getCurrentUserEvents(): Promise<Array<EventData_Api>> {
    return fetch('/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type CreateEventData = {
    start: Date,
    end: Date,
    title: string,
    description: string,
    invitedUsersIds: Array<string>,
    organizerId: string,
    place: string,
    repeatable: CalendarEventRepeatableType;
    isRepeatable: boolean;
}

function createEvent(eventData: CreateEventData): Promise<{eventId: string}> {
    return fetch('/create/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate: eventData.start.getTime(),
            endDate: eventData.end.getTime(),
            title: eventData.title,
            description: eventData.description,
            organizerId: eventData.organizerId,
            place: eventData.place,
            userIds: eventData.invitedUsersIds,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type EditEventData = {
    eventId: string,
    start: Date,
    end: Date,
    title: string,
    description: string,
    invitedUsersIds: Array<string>,
    organizerId: string,
    place: string,
    repeatable: CalendarEventRepeatableType;
    isRepeatable: boolean;
}

function editEvent(eventData: EditEventData) {
    return fetch('/edit/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eventId: eventData.eventId,
            startDate: eventData.start.getTime(),
            endDate: eventData.end.getTime(),
            title: eventData.title,
            description: eventData.description,
            organizerId: eventData.organizerId,
            place: eventData.place,
            userIds: eventData.invitedUsersIds,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function removeEvent(eventId: string) {
    return fetch('/remove/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eventId,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function getUsersToInvite(): Promise<{userIds: Array<string>}> {
    return fetch('/get_all_users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

const EventsApi = {
    getCurrentUserEvents,
    createEvent,
    editEvent,
    removeEvent,
    getUsersToInvite,
}

export type {
    CreateEventData,
    EditEventData,
}
export {
    EventsApi,
}