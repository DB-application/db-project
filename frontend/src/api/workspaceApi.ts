import {WorkspaceData} from "../workspace/viewmodel/workspace/workspace";

function getWorkspacesList(): Promise<Array<WorkspaceData>> {
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

function createWorkspace(): Promise<{id: string}> {
    return new Promise<{id: string}>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 'qwerty',
            })
        }, 1000)
    })
}

type EditWorkspacePayload = {
    id: string,
    name: string,
    invitedUsersIds: Array<string>,
}

function editWorkspace(payload: EditWorkspacePayload): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function deleteWorkspace(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
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