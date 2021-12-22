import {NoteArea} from "./NoteArea";
import {useRouteMatch} from "react-router-dom";
import {useAction} from "@reatom/react";
import {notesActions} from "../../viewmodel/notes/notes";
import {useEffect} from "react";
import { openNote } from "../../viewmodel/notes/openNote";

type NoteIdParams = {
    noteId: string;
}

function NoteAreaWrapper() {
    const {params} = useRouteMatch<NoteIdParams>()
    const handleOpenNote = useAction(openNote)

    useEffect(() => {
        handleOpenNote(params.noteId)
    }, [handleOpenNote, params.noteId])

    return <NoteArea/>
}

export {
    NoteAreaWrapper,
}