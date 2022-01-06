import styles from './WorkspaceBlock.module.css'
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {sidebarAtom} from "../../viewmodel/sidebar/sidebar";
import {AvatarWrapper} from "../../../common/avatar/Avatar";
import {useRef, useState} from "react";
import {PopoverPortal} from "../../../core/portal/PopoverPortal";
import {WorkspacePickerPopover} from './WorkspacePickerPopover';


const getWorkspaceName = (name: string) => {
    return name
        .split(' ')
        .slice(0, 2)
        .join(' ')
}

function WorkspacePicker() {
    const pickerRef = useRef<HTMLDivElement|null>(null)
    const [popoverShow, setPopoverShow] = useState(false)
    const currentWorkspace = useAtomWithSelector(sidebarAtom, x => x.currentWorkspace)
    const workspaces = useAtomWithSelector(sidebarAtom, x => x.workspaces)

    const currentWorkspaceData = workspaces[currentWorkspace]

    return (
        <>
            <div
                ref={pickerRef}
                className={styles.pickerContainer}
                onClick={() => setPopoverShow(true)}
            >
                <AvatarWrapper
                    label={getWorkspaceName(currentWorkspaceData.name)}
                    className={styles.workspaceAvatar}
                    size={'small'}
                />
                <div className={styles.name}>
                    {currentWorkspaceData.name}
                </div>
            </div>
            <PopoverPortal
                elementRef={pickerRef}
                show={popoverShow}
                setShow={setPopoverShow}
                content={<WorkspacePickerPopover />}
                side={'bottom'}
            />
        </>

    )
}


function WorkspaceBlock() {

    return (
        <div className={styles.container}>
            <WorkspacePicker />
        </div>
    )
}

export {
    WorkspaceBlock,
}
