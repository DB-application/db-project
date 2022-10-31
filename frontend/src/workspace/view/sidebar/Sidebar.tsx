import { useAtomWithSelector } from '../../../core/reatom/useAtomWithSelector';
import { getStylesWithMods } from '../../../core/styles/getStylesWithMods';
import { workspaceLayoutAtom } from '../../viewmodel/workspaceLoading';
import { NotesList } from './NotesList'
import styles from './Sidebar.module.css'
import {WorkspaceBlock} from "./WorkspaceBlock";

function Sidebar() {
    const showSidebar = useAtomWithSelector(workspaceLayoutAtom, x => x.showSidebar)

    return (
        <div className={getStylesWithMods(styles.sidebar, {
            [styles.sidebarHidden]: !showSidebar, 
        })}>
            <WorkspaceBlock />
            <NotesList />
        </div>
    )
}

export {
    Sidebar,
}