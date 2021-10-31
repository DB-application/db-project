import {initNotes} from "./notes/initNotes";
import {combine, declareAtom, map} from "@reatom/core";

const notesLoadingAtom = declareAtom('notesLoading', true, on => [
    on(initNotes, () => true),
    on(initNotes.done, () => false),
])

const workspaceLoadingAtom = map(
    combine({
        notesLoading: notesLoadingAtom,
    }),
    ({notesLoading}) => notesLoading,
)

export {
    workspaceLoadingAtom,
}