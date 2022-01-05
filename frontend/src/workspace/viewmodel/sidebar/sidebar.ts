import {combine, declareAtom} from "@reatom/core";
import {Button_State_Type} from "../../../common/button/Button_Base";
import {addNote} from "../notes/addNote";
import {currentWorkspaceAtom, workspacesAtom} from "../workspace/workspace";

const addNoteButtonStateAtom = declareAtom<Button_State_Type>('addNoteButtonState', 'normal', on => [
    on(addNote, () => 'preloader'),
    on(addNote.done, () => 'normal'),
    on(addNote.fail, () => 'normal'),
])

const sidebarAtom = combine({
    addNoteButtonState: addNoteButtonStateAtom,
    workspaces: workspacesAtom,
    currentWorkspace: currentWorkspaceAtom,
})

export {
    sidebarAtom,
}