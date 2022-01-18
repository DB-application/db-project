import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {sidebarAtom} from "../../viewmodel/sidebar/sidebar";
import {List_Base, ListItemProps} from "../../../common/list/List_Base";
import {WorkspaceData} from "../../viewmodel/workspace/workspace";
import styles from './WorkspacePickerPopover.module.css'
import {BxCheckIcon} from "../../../icons/BxCheckIcon";
import {AvatarWrapper} from "../../../common/avatar/Avatar";
import {useAction} from "@reatom/react";
import {openWorkspace} from "../../viewmodel/workspace/loadWorkspace";
import {createWorkspace} from "../../viewmodel/workspace/createWorkspace";
import {Button_Text} from "../../../common/button/Button_Text";
import {Button_Icon} from "../../../common/button/Button_Icon";
import {MoreAltIcon} from "../../../icons/MoreAltIcon";
import {useRef} from "react";
import {useEventHandler} from "../../../core/hooks/useEventHandler";
import {editWorkspacePopupActions} from "../../viewmodel/editWorkspacePopup/editWorkspacePopup";
import {I18n_get} from "../../../i18n/i18n_get";
import {Router} from "../../../core/router/router";


type WorkspacesListItemProps = {
    workspace: WorkspaceData,
    selected: boolean,
    onClick: () => void,
}

const getWorkspaceName = (name: string) => {
    return name
        .split(' ')
        .slice(0, 2)
        .join(' ')
}

function WorkspacesListItem({
    workspace,
    selected,
    onClick,
}: WorkspacesListItemProps) {
    const itemRef = useRef<HTMLDivElement|null>(null)
    const handleOpenEditWorkspacePopup = useAction(editWorkspacePopupActions.open)

    useEventHandler('click', itemRef, (e: Event) => {
        !e.defaultPrevented && onClick()
    })

    return (
        <div className={styles.listItem} ref={itemRef}>
            {selected && <BxCheckIcon
                className={styles.tickIcon}
            />}
            <AvatarWrapper
                label={getWorkspaceName(workspace.name)}
                className={styles.workspaceAvatar}
                size={'small'}
            />
            <div className={styles.name}>
                {workspace.name}
            </div>
            <Button_Icon
                icon={<MoreAltIcon />}
                onClick={() => handleOpenEditWorkspacePopup(workspace)}
                style={'link'}
                size={'small'}
                className={styles.moreIcon}
            />
        </div>
    )
}

function WorkspacePickerPopover() {
    const currentWorkspace = useAtomWithSelector(sidebarAtom, x => x.currentWorkspace)
    const workspacesList = useAtomWithSelector(sidebarAtom, x => x.workspacesList)
    const addWorkspaceButtonState = useAtomWithSelector(sidebarAtom, x => x.addWorkspaceButtonState)
    const handleOpenWorkspace = useAction(openWorkspace)
    const handleCreateWorkspace = useAction(createWorkspace)

    const listItems: Array<ListItemProps|null> = workspacesList.map((workspace) => {
        return {
            id: workspace.id,
            createBindingFn: () => <WorkspacesListItem
                selected={workspace.id === currentWorkspace}
                workspace={workspace}
                onClick={() => {
                    Router.Workspace.open()
                    handleOpenWorkspace(workspace.id)
                }}
            />
        }
    })

    return (
        <div className={styles.pickerContainer}>
            <List_Base
                items={listItems}
            />
            <Button_Text
                text={I18n_get('Sidebar.CreateWorkspace')}
                onClick={() => handleCreateWorkspace(I18n_get('Sidebar.NewWorkspace'))}
                state={addWorkspaceButtonState}
                style={'primary'}
                className={styles.createButton}
            />
        </div>
    )
}

export {
    WorkspacePickerPopover,
}