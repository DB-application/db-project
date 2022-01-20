import {initNotes} from "./notes/initNotes";
import {combine, declareAtom, map} from "@reatom/core";
import {openWorkspace} from "./workspace/loadWorkspace";
import {declareAtomWithSetter} from "../../core/reatom/declareAtomWithSetter";

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

const [showSidebarAtom, setShowSidebar] = declareAtomWithSetter(
    'workspace.showSidebarAtom',
    true
)

const workspaceLayoutAtom = combine({
    workspaceLoading: workspaceLoadingAtom,
    showSidebar: showSidebarAtom,
})

const workspaceLayoutActions = {
    setShowSidebar,
}

export {
    workspaceLayoutAtom,
    workspaceLayoutActions,
}