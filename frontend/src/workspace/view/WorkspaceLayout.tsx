import styles from './WorkspaceLayout.module.css'
import {TopPanel} from "./topPanel/TopPanel";
import {Sidebar} from "./sidebar/Sidebar";
import {WorkArea} from './workArea/WorkArea';
import {useEffect} from "react";
import {initNotes} from '../viewmodel/notes/initNotes';
import {useAction, useAtom} from "@reatom/react";
import {workspaceLoadingAtom} from "../viewmodel/workspaceLoading";
import {Preloader} from "../../common/preloader/Preloader";

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
    const handleInitNotes = useAction(initNotes)
    const workspaceLoading = useAtom(workspaceLoadingAtom)
    
    useEffect(() => {
        handleInitNotes()
    }, [handleInitNotes])

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