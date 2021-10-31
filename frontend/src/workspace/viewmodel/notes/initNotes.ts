import {notesActions} from "./notes";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";


const initNotes = declareAsyncAction<void, void>(
    'initNotes',
    (_, store) => {
        return new Promise<void>(async (resolve, reject) => {
            setTimeout(() => {
                store.dispatch(notesActions.initNotes([
                    {
                        noteId: '1',
                        title: 'Заметка 1 Заметка 1 Заметка 1 ',
                    },
                    {
                        noteId: '3',
                        title: 'Заметка 3',
                    },
                    {
                        noteId: '2',
                        title: 'Заметка 2',
                    },
                ]))
                resolve()
            }, 1000)
        })

    }
)

export {
    initNotes,
}