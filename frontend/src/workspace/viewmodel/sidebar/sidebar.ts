import {combine, declareAtom} from "@reatom/core";
import {Button_State_Type} from "../../../common/button/Button_Base";
import {addNote} from "../notes/addNote";
import {currentWorkspaceAtom, workspaceListAtom, workspacesAtom} from "../workspace/workspace";
import {createWorkspace} from "../workspace/createWorkspace";

const addNoteButtonStateAtom = declareAtom<Button_State_Type>('addNoteButtonState', 'normal', on => [
    on(addNote, () => 'preloader'),
    on(addNote.done, () => 'normal'),
    on(addNote.fail, () => 'normal'),
])

const addWorkspaceButtonStateAtom = declareAtom<Button_State_Type>('addWorkspaceButtonStateAtom', 'normal', on => [
    on(createWorkspace, () => 'preloader'),
    on(createWorkspace.done, () => 'normal'),
    on(createWorkspace.fail, () => 'normal'),
])

const sidebarAtom = combine({
    addNoteButtonState: addNoteButtonStateAtom,
    addWorkspaceButtonState: addWorkspaceButtonStateAtom,
    workspaces: workspacesAtom,
    workspacesList: workspaceListAtom,
    currentWorkspace: currentWorkspaceAtom,
})

export {
    sidebarAtom,
}