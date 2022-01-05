import {WorkspaceData} from "../workspace/viewmodel/workspace/workspace";
import {HttpStatus} from "../core/http/HttpStatus";
import {goToAuth} from "../core/link/goToUrl";

function getWorkspacesList(): Promise<Array<WorkspaceData>> {
    // return fetch('/workspaces', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToAuth()
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
    return new Promise<Array<WorkspaceData>>((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    name: 'Рабочее пространство по умолчанию',
                    invitedUsersIds: [],
                    createdBy: 'fe12f16f-25a4-41a8-9249-d435c889cc52',
                },
                {
                    id: '2',
                    name: 'Второе рабочее пространство',
                    invitedUsersIds: [],
                    createdBy: 'fe12f16f-25a4-41a8-9249-d435c889cc52',
                }
            ])
        }, 1000)
    })
}

type CreateWorkspacePayload = {
    name: string,
}

function createWorkspace(payload: CreateWorkspacePayload): Promise<{id: string}> {
    return fetch('/create/workspace', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: payload.name,
        }),
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
    // return new Promise<{id: string}>((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({
    //             id: 'qwerty',
    //         })
    //     }, 1000)
    // })
}

type EditWorkspacePayload = {
    id: string,
    name: string,
    invitedUsersIds: Array<string>,
}

function editWorkspace(payload: EditWorkspacePayload): Promise<void> {
    return fetch('/edit/workspace', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: payload.name,
            name: payload.name,
            invitedUsersIds: payload.invitedUsersIds,
        }),
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
    // return new Promise<void>((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve()
    //     }, 1000)
    // })
}

function deleteWorkspace(id: string): Promise<void> {
    return fetch('/delete/workspace', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            workspaceId: id,
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
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve()
    //     }, 1000)
    // })
}



const WorkspaceApi = {
    createWorkspace,
    deleteWorkspace,
    getWorkspacesList,
    editWorkspace,
}

export type {
    EditWorkspacePayload,
}

export {
    WorkspaceApi,
}