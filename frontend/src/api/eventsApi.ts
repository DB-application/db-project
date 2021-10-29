import {HttpStatus} from "../core/http/HttpStatus";
import { goToUrl } from "../core/link/goToUrl";
import {CalendarEvent} from "../workspace/viewmodel/calendar/calendar";

function getCurrentUserEvents(): Promise<Array<CalendarEvent>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([])
        }, 1000)
    })
    // return fetch('/events', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

type CreateEventData = {
    start: Date,
    end: Date,
    title: string,
    description: string,
    invitedUsersIds: Array<string>,
    organizerId: string,
}

function createEvent(eventData: CreateEventData): Promise<{eventId: string}> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({eventId: '1'})
        }, 1000)
    })
    // return fetch('/create/event', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(eventData)
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

type EditEventData = {
    eventId: string,
    start: Date,
    end: Date,
    title: string,
    description: string,
    invitedUsersIds: Array<string>,
    organizerId: string,
}

function editEvent(eventData: EditEventData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(undefined)
        }, 1000)
    })
    // return fetch('/edit/event', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(eventData)
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return Promise.resolve(response)
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

function removeEvent(eventId: string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(undefined)
        }, 1000)
    })
    // return fetch('/remove/event', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         eventId,
    //     })
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return Promise.resolve(response)
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

const EventsApi = {
    getCurrentUserEvents,
    createEvent,
    editEvent,
    removeEvent,
}

export type {
    CreateEventData,
    EditEventData,
}
export {
    EventsApi,
}