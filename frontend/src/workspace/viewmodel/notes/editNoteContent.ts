import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {NotesApi} from "../../../api/noteApi";
import {JSONContent} from "@tiptap/react";

type EditNoteContentPayload = {
    noteId: string,
    content: string,
}

const editNoteContent = declareAsyncAction<EditNoteContentPayload, JSONContent>(
    'editNoteContent',
    ({noteId, content}, store) => {
        return NotesApi.editNoteContent({noteId, content})
            .then(() => {
                return Promise.resolve(content)
            })
    }
)

export {
    editNoteContent,
}