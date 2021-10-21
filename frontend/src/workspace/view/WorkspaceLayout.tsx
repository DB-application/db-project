import styles from './WorkspaceLayout.module.css'
import {TopPanel} from "./topPanel/TopPanel";
import {Sidebar} from "./sidebar/Sidebar";
import {WorkArea} from './workArea/WorkArea';

function WorkspaceLayout() {
    return (
        <div className={styles.workspaceWrapper}>
            <TopPanel />
            <Sidebar />
            <WorkArea />
        </div>
    )
}

export {
    WorkspaceLayout,
}