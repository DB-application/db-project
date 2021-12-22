import {WorkspaceData} from "../workspace/viewmodel/workspace/workspace";
import {set} from "local-storage";

function getWorkspacesList(): Promise<Array<WorkspaceData>> {
    return new Promise<Array<WorkspaceData>>((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    name: 'Рабочее пространство по умолчанию',
                },
                {
                    id: '2',
                    name: 'Второе рабочее пространство',
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

function deleteWorkspace(): Promise<void> {
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
}

export {
    WorkspaceApi,
}