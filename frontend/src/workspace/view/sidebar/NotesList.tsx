import {useAction, useAtom} from "@reatom/react";
import {notesActions, orderedNotesAtom, selectedNoteAtom} from "../../viewmodel/notes/notes";
import styles from './NotesList.module.css'
import {Button_Icon} from "../../../common/button/Button_Icon";
import {MoreAltIcon} from "../../../icons/MoreAltIcon";
import {useMemo, useRef, useState} from "react";
import {PopoverPortal} from "../../../core/portal/PopoverPortal";
import {List_Base, ListItemProps} from "../../../common/list/List_Base";
import {ListItem_IconAndText} from "../../../common/list/item/ListItem_IconAndText";
import {I18n_get} from "../../../i18n/i18n_get";
import {DeleteBinLineIcon} from "../../../icons/DeleteBinLineIcon";
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";
import {PlusCircleIcon} from "../../../icons/PlusCircleIcon";
import {Button_IconAndText} from "../../../common/button/Button_IconAndText";
import {addNote} from "../../viewmodel/notes/addNote";
import {sidebarAtom} from "../../viewmodel/sidebar/sidebar";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {removeNote} from "../../viewmodel/notes/removeNote";

type NotesListItemProps = {
    id: string,
    title: string,
    selected: boolean,
    onClick: () => void,
}

type NotesListItemWrapperProps = {
    id: string,
    title: string,
    selected: boolean,
}

type NoteContextMenu = {
    id: string,
}

function NoteContextMenu({
    id,
}: NoteContextMenu) {
    const ref = useRef<HTMLDivElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState(false)
    const handleRemoveNote = useAction(removeNote)

    const items: Array<ListItemProps> = useMemo(() => {
        return [
            {
                id: 'remove',
                createBindingFn: () => <ListItem_IconAndText
                    icon={<DeleteBinLineIcon />}
                    text={I18n_get('Sidebar.RemoveNote')}
                    onClick={() => {
                        setPopoverOpened(false)
                        handleRemoveNote(id)
                    }}
                    className={styles.contextMenuItem}
                />
            },

        ]
    }, [])

    return (
        <>
            <div ref={ref} className={styles.contextMenu}>
                <Button_Icon
                    icon={<MoreAltIcon />}
                    onClick={() => setPopoverOpened(true)}
                    style={'link'}
                    size={'small'}
                />
            </div>
            <PopoverPortal
                elementRef={ref}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<List_Base items={items} />}
            />
        </>
    )
}

function NotesListItem({
    title,
    id,
    selected,
    onClick,
}: NotesListItemProps) {

    const containerClassName = getStylesWithMods(styles.noteContainer, {
        [styles.selectedNote]: selected,
    })

    const _onClick = (e: any) => {
        if (!e.defaultPrevented) {
            onClick()
        }
        e.preventDefault()
    }

    return (
        <div className={containerClassName} onClick={_onClick}>
            <div className={styles.title}>
                {title}
            </div>
            <NoteContextMenu
                id={id}
            />
        </div>
    )
}

const NotesListItemWrapper = ({
    selected,
    id,
    title,
}: NotesListItemWrapperProps) => {
    const handleSetSelectedNote = useAction(notesActions.setSelectedNote)
    return (
        <NotesListItem
            title={title}
            id={id}
            selected={selected}
            onClick={() => {
                handleSetSelectedNote(id)
            }}
        />
    )
}

function NotesList() {
    const notes = useAtom(orderedNotesAtom)
    const addButtonState = useAtomWithSelector(sidebarAtom, x => x.addNoteButtonState)
    const selectedNote = useAtom(selectedNoteAtom)
    const handleAddNote = useAction(addNote)

    return (
        <div className={styles.container}>
            <Button_IconAndText
                icon={<PlusCircleIcon/>}
                text={'Добавить заметку'}
                onClick={handleAddNote}
                style={'primary'}
                state={addButtonState}
                className={styles.addButton}
            />

            <div className={styles.notesList}>
                {notes.map(note => (
                    <NotesListItemWrapper
                        key={note.noteId}
                        id={note.noteId}
                        title={note.title}
                        selected={selectedNote === note.noteId}
                    />
                ))}
            </div>
        </div>
    )
}

export {
    NotesList
}