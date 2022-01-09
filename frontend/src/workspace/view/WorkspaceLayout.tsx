import styles from './WorkspaceLayout.module.css'
import {TopPanel} from "./topPanel/TopPanel";
import {Sidebar} from "./sidebar/Sidebar";
import {WorkArea} from './workArea/WorkArea';
import {useEffect} from "react";
import {useAction, useAtom} from "@reatom/react";
import {workspaceLoadingAtom} from "../viewmodel/workspaceLoading";
import {Preloader} from "../../common/preloader/Preloader";
import {initWorkspaces} from "../viewmodel/workspace/initWorkspaces";
import {PopupPortal} from "../../core/portal/PopupPortal";
import {editWorkspacePopupActions, editWorkspacePopupAtom} from "../viewmodel/editWorkspacePopup/editWorkspacePopup";
import {useAtomWithSelector} from "../../core/reatom/useAtomWithSelector";
import {EditWorkspacePopup} from "./editWorkspacePopup/EditWorkspacePopup";
import {inviteUsersPopupActions, inviteUsersPopupAtom} from "../viewmodel/inviteUsers/inviteUsers";
import {InviteUsersPopup} from './common/inviteUsersPopup/InviteUsersPopup';
import {settingsPopupActions, settingsPopupAtom} from "../viewmodel/settingsPopup/settingsPopup";
import {SettingsPopup} from "./settinsPopup/SettingsPopup";

function PopupsLayer() {
    const showEditWorkspacePopup = useAtomWithSelector(editWorkspacePopupAtom, x => x.opened)
    const showInviteUsers = useAtomWithSelector(inviteUsersPopupAtom, x => x.show)
    const showSettingsPopup = useAtomWithSelector(settingsPopupAtom, x => x.opened)
    const handleCloseEditEventPopup = useAction(editWorkspacePopupActions.close)
    const handleCloseInviteUsersPopup = useAction(inviteUsersPopupActions.close)
    const handleCloseSettingsPopup = useAction(settingsPopupActions.close)

    return (
        <>
            <PopupPortal
                show={showEditWorkspacePopup}
                close={handleCloseEditEventPopup}
                binding={<EditWorkspacePopup />}
            />
            <PopupPortal
                show={showInviteUsers}
                close={handleCloseInviteUsersPopup}
                binding={<InviteUsersPopup/>}
            />
            <PopupPortal
                show={showSettingsPopup}
                close={handleCloseSettingsPopup}
                binding={<SettingsPopup />}
            />
        </>
    )
}


function WorkspaceContent() {
    return(
        <>
            <TopPanel />
            <Sidebar />
            <WorkArea />
            <PopupsLayer />
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