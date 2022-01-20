import { NotesList } from './NotesList'
import styles from './Sidebar.module.css'
import {WorkspaceBlock} from "./WorkspaceBlock";
import {useAction} from "@reatom/react";
import {workspaceLayoutActions} from "../../viewmodel/workspaceLoading";
import {Button_Icon} from "../../../common/button/Button_Icon";
import {ArrowLeft} from "../../../icons/ArrowLeft";
import {I18n_get} from "../../../i18n/i18n_get";

function Sidebar() {
    const handleSetShowSidebar = useAction(workspaceLayoutActions.setShowSidebar)
    return (
        <div className={styles.sidebar}>
            <div className={styles.container}>
                <WorkspaceBlock />
                <Button_Icon
                    icon={<ArrowLeft />}
                    onClick={() => handleSetShowSidebar(false)}
                    style={'link'}
                    className={styles.hidePanelButton}
                    tooltipText={I18n_get('Sidebar.HidePanel')}
                />
            </div>
            <NotesList />
        </div>
    )
}

export {
    Sidebar,
}