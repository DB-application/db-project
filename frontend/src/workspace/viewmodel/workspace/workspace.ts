import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {declareAction} from "@reatom/core";

type WorkspaceData = {
    id: string,
    name: string,
}

const addWorkspace = declareAction<WorkspaceData>()
const removeWorkspace = declareAction<string>()

const [workspacesListAtom, setWorkspacesList] = declareAtomWithSetter<Array<WorkspaceData>>('sidebar.workspacesList', [], on => [
    on(addWorkspace, (state, value) => [...state, value]),
    on(removeWorkspace, (state, value) => state.filter(workspace => workspace.id !== value)),
])

const [currentWorkspaceAtom, setCurrentWorkspace] = declareAtomWithSetter<string>('currentWorkspaceAtom', '')

const workspacesActions = {
    addWorkspace,
    removeWorkspace,
}

export {
    workspacesListAtom,
    currentWorkspaceAtom,
    setCurrentWorkspace,
    setWorkspacesList,
    workspacesActions
}

export type {
    WorkspaceData,
}