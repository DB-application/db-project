import {WorkspaceData} from "../workspace/viewmodel/workspace/workspace";
import {HttpStatus} from "../core/http/HttpStatus";
import {goToAuth} from "../core/link/goToUrl";

function getWorkspacesList(): Promise<Array<WorkspaceData>> {
    return fetch('/workspaces', {
        method: 'GET',
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
            id: payload.id,
            name: payload.name,
            invitedUsersIds: payload.invitedUsersIds,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
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
                    return Promise.resolve()
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function getInvitedUsers(workspaceId: string): Promise<Array<string>> {
    return fetch('/workspace/get_invited_users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            workspaceId,
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



const WorkspaceApi = {
    createWorkspace,
    deleteWorkspace,
    getWorkspacesList,
    editWorkspace,
    getInvitedUsers,
}

export type {
    EditWorkspacePayload,
}

export {
    WorkspaceApi,
}