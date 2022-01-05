import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {declareMapAtom} from "../../../core/reatom/declareMapAtom";

type WorkspaceData = {
    id: string,
    name: string,
    invitedUsersIds: Array<string>,
    createdBy: string,
}

const {
    atom: workspacesAtom,
    removeItems: removeWorkspace,
    updateItem: updateWorkspace,
    updateItems: updateWorkspaces,
} = declareMapAtom<WorkspaceData>(
    'sidebar.notes',
    (workspace => workspace.id),
)

const [currentWorkspaceAtom, setCurrentWorkspace] = declareAtomWithSetter<string>('currentWorkspaceAtom', '')

const workspacesActions = {
    removeWorkspace,
    updateWorkspace,
    updateWorkspaces,
}

export {
    workspacesAtom,
    currentWorkspaceAtom,
    setCurrentWorkspace,
    workspacesActions
}

export type {
    WorkspaceData,
}