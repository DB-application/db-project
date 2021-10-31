import { NotesList } from './NotesList'
import styles from './Sidebar.module.css'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <NotesList />
        </div>
    )
}

export {
    Sidebar,
}