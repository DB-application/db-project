import {noteAtom} from "../../viewmodel/notes/note";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {Preloader} from "../../../common/preloader/Preloader";
import {NoteEditor} from "./NoteEditor";

function NoteArea() {
    const isLoading = useAtomWithSelector(noteAtom, x => x.isLoading)

    return isLoading
        ? <Preloader/>
        : <NoteEditor/>
}

export {
    NoteArea,
}