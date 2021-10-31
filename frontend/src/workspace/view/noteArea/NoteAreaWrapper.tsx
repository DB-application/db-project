import {NoteArea} from "./NoteArea";
import {useRouteMatch} from "react-router-dom";
import {useAction} from "@reatom/react";
import {notesActions} from "../../viewmodel/notes/notes";
import {useEffect} from "react";
import {getNoteContent} from "../../viewmodel/notes/getNoteContent";

type NoteIdParams = {
    noteId: string;
}

function NoteAreaWrapper() {
    const {params} = useRouteMatch<NoteIdParams>()
    const handleSetSelectedNote = useAction(notesActions.setSelectedNote)
    const handleGetContent = useAction(getNoteContent)

    useEffect(() => {
        handleSetSelectedNote(params.noteId)
        handleGetContent(params.noteId)
    }, [handleSetSelectedNote, params.noteId, handleGetContent])

    return <NoteArea/>
}

export {
    NoteAreaWrapper,
}