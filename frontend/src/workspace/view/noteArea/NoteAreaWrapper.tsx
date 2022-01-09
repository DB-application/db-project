import {NoteArea} from "./NoteArea";
import {useRouteMatch} from "react-router-dom";
import {useAction} from "@reatom/react";
import {sidebarNotesAtom} from "../../viewmodel/notes/notes";
import {useEffect} from "react";
import {openNote} from "../../viewmodel/notes/openNote";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";

type NoteIdParams = {
    noteId: string;
}

function NoteAreaWrapper() {
    const {params} = useRouteMatch<NoteIdParams>()
    const selectedNote = useAtomWithSelector(sidebarNotesAtom, x => x.selectedNote)
    const handleOpenNote = useAction(openNote)

    useEffect(() => {
        if (params.noteId !== selectedNote) {
            handleOpenNote(params.noteId)
        }
    }, [handleOpenNote, params.noteId])

    return <NoteArea/>
}

export {
    NoteAreaWrapper,
}