import { NotesList } from './NotesList'
import styles from './Sidebar.module.css'
import {WorkspaceBlock} from "./WorkspaceBlock";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <WorkspaceBlock />
            <NotesList />
        </div>
    )
}

export {
    Sidebar,
}