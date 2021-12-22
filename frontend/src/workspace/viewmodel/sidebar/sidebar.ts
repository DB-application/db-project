import {combine, declareAtom} from "@reatom/core";
import {Button_State_Type} from "../../../common/button/Button_Base";
import {addNote} from "../notes/addNote";
import {currentWorkspaceAtom, workspacesListAtom} from "../workspace/workspace";

const addNoteButtonStateAtom = declareAtom<Button_State_Type>('addNoteButtonState', 'normal', on => [
    on(addNote, () => 'preloader'),
    on(addNote.done, () => 'normal'),
    on(addNote.fail, () => 'normal'),
])

const sidebarAtom = combine({
    addNoteButtonState: addNoteButtonStateAtom,
    workspacesList: workspacesListAtom,
    currentWorkspace: currentWorkspaceAtom,
})

export {
    sidebarAtom,
}