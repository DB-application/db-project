import {combine} from "@reatom/core";
import {currentWorkspaceAtom, workspaceListAtom, workspacesAtom} from "../workspace/workspace";

const sidebarAtom = combine({
    workspaces: workspacesAtom,
    workspacesList: workspaceListAtom,
    currentWorkspace: currentWorkspaceAtom,
})

export {
    sidebarAtom,
}