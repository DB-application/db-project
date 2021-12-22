import styles from './WorkspaceLayout.module.css'
import {TopPanel} from "./topPanel/TopPanel";
import {Sidebar} from "./sidebar/Sidebar";
import {WorkArea} from './workArea/WorkArea';
import {useEffect} from "react";
import {initNotes} from '../viewmodel/notes/initNotes';
import {useAction, useAtom} from "@reatom/react";
import {workspaceLoadingAtom} from "../viewmodel/workspaceLoading";
import {Preloader} from "../../common/preloader/Preloader";
import {initWorkspaces} from "../viewmodel/workspace/initWorkspaces";

function WorkspaceContent() {
    return(
        <>
            <TopPanel />
            <Sidebar />
            <WorkArea />
        </>
    )
}

function WorkspaceLayout() {
    const handleInitWorkspaces = useAction(initWorkspaces)
    const workspaceLoading = useAtom(workspaceLoadingAtom)
    useEffect(() => {
        handleInitWorkspaces()
    }, [handleInitWorkspaces])

    return (
        <div className={styles.workspaceWrapper}>
            {workspaceLoading
                ? <Preloader />
                : <WorkspaceContent />
            }
        </div>
    )
}

export {
    WorkspaceLayout,
}