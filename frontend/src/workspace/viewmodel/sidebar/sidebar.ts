import {combine, declareAtom} from "@reatom/core";
import {Button_State_Type} from "../../../common/button/Button_Base";
import {addNote} from "../notes/addNote";
import {currentWorkspaceAtom, workspaceListAtom, workspacesAtom} from "../workspace/workspace";
import {createWorkspace} from "../workspace/createWorkspace";

const sidebarAtom = combine({
    workspaces: workspacesAtom,
    workspacesList: workspaceListAtom,
    currentWorkspace: currentWorkspaceAtom,
})

export {
    sidebarAtom,
}