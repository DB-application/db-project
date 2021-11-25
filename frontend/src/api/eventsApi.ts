import {HttpStatus} from "../core/http/HttpStatus";
import {goToAuth} from "../core/link/goToUrl";


type EventData_Api = {
    eventId: string,
    title: string;
    description: string,
    startDate: number;
    endDate: number;
    organizerId: string;
    place: string;
    invitedUsersIds: Array<string>;
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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                userIds: ['1', '2', '3', '4', '5'],
            })
        }, 1000)
    })
}

function inviteUsers(userId: Array<string>): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function removeUsersFromEvent(userId: Array<string>): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const EventsApi = {
    getCurrentUserEvents,
    createEvent,
    editEvent,
    removeEvent,
    getUsersToInvite,
    inviteUsers,
    removeUsersFromEvent,
}

export type {
    CreateEventData,
    EditEventData,
}
export {
    EventsApi,
}