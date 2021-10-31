import {Redirect, useRouteMatch} from "react-router-dom";
import {useAction, useAtom} from "@reatom/react";
import {notesActions, notesAtom} from "../../viewmodel/notes/notes";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {Router} from "../../../core/router/router";
import {noteAtom} from "../../viewmodel/notes/note";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {Preloader} from "../../../common/preloader/Preloader";

type NoteIdParams = {
    noteId: string;
}

function NoteContent() {
    const currentNote = useAtom(noteAtom)

    return (
        <div>
            {currentNote.title}
            {JSON.stringify(currentNote.content)}
        </div>
    )
}

function NoteArea() {
    const isLoading = useAtomWithSelector(noteAtom, x => x.isLoading)

    return isLoading
        ? <Preloader/>
        : <NoteContent/>
}

export {
    NoteArea,
}