import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {combine, map} from "@reatom/core";

type WorkspaceData = {
    id: string,
    name: string,
    ownerId: string,
}

const {
    atom: workspacesAtom,
    removeItems: removeWorkspace,
    updateItem: updateWorkspace,
    updateItems: updateWorkspaces,
} = declareMapAtom<WorkspaceData>(
    'sidebar.workspacesAtom',
    (workspace => workspace.id),
)

const [currentWorkspaceAtom, setCurrentWorkspace] = declareAtomWithSetter<string>('currentWorkspaceAtom', '')

const workspaceListAtom = map(
    combine({
        workspaces: workspacesAtom
    }),
    ({workspaces}) => Object.values(workspaces).sort((workspace1, workspace2) => workspace1.name < workspace2.name ? 1 : -1)
)

const workspacesActions = {
    removeWorkspace,
    updateWorkspace,
    updateWorkspaces,
}

export {
    workspacesAtom,
    workspaceListAtom,
    currentWorkspaceAtom,
    setCurrentWorkspace,
    workspacesActions
}

export type {
    WorkspaceData,
}