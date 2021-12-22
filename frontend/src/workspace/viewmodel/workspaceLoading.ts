import {initNotes} from "./notes/initNotes";
import {combine, declareAtom, map} from "@reatom/core";
import {openWorkspace} from "./workspace/loadWorkspace";

const notesLoadingAtom = declareAtom('notesLoading', true, on => [
    on(initNotes, () => true),
    on(initNotes.done, () => false),
])
const workspacesLoadingAtom = declareAtom('workspacesLoading', true, on => [
    on(openWorkspace, () => true),
    on(openWorkspace.done, () => false),
])

const workspaceLoadingAtom = map(
    combine({
        notesLoading: notesLoadingAtom,
        workspacesLoading: workspacesLoadingAtom,
    }),
    ({notesLoading, workspacesLoading}) => (notesLoading || workspacesLoading),
)

export {
    workspaceLoadingAtom,
}