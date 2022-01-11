import {NoteArea} from "./NoteArea";
import {useRouteMatch} from "react-router-dom";
import {useAction} from "@reatom/react";
import {sidebarNotesAtom} from "../../viewmodel/notes/notes";
import {useEffect} from "react";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {getNoteContent} from "../../viewmodel/notes/getNoteContent";

type NoteIdParams = {
    noteId: string;
}

function NoteAreaWrapper() {
    const {params} = useRouteMatch<NoteIdParams>()
    const handleGetNoteContent = useAction(getNoteContent)

    useEffect(() => {
        handleGetNoteContent(params.noteId)
    }, [handleGetNoteContent, params.noteId])

    return <NoteArea/>
}

export {
    NoteAreaWrapper,
}