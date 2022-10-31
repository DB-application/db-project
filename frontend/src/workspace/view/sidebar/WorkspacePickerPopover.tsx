import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {sidebarAtom} from "../../viewmodel/sidebar/sidebar";
import {ListBase, ListItemProps} from "../../../common/list/ListBase";
import {WorkspaceData} from "../../viewmodel/workspace/workspace";
import styles from './WorkspacePickerPopover.module.css'
import {BxCheckIcon} from "../../../icons/BxCheckIcon";
import {AvatarWrapper} from "../../../common/avatar/Avatar";
import {useAction, useAtom} from "@reatom/react";
import {openWorkspace} from "../../viewmodel/workspace/loadWorkspace";
import {createWorkspace} from "../../viewmodel/workspace/createWorkspace";
import {ButtonText} from "../../../common/button/ButtonText";
import {ButtonIcon} from "../../../common/button/ButtonIcon";
import {MoreAltIcon} from "../../../icons/MoreAltIcon";
import {useRef} from "react";
import {useEventHandler} from "../../../core/hooks/useEventHandler";
import {editWorkspacePopupActions} from "../../viewmodel/editWorkspacePopup/editWorkspacePopup";
import {I18n_get} from "../../../i18n/i18n_get";
import {Router} from "../../../core/router/router";
import {declareAtom} from "@reatom/core";
import {Button_State_Type} from "../../../common/button/ButtonBase";


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
            <ButtonIcon
                icon={<MoreAltIcon />}
                onClick={() => handleOpenEditWorkspacePopup(workspace)}
                style={'link'}
                size={'small'}
                className={styles.moreIcon}
            />
        </div>
    )
}

const addWorkspaceButtonStateAtom = declareAtom<Button_State_Type>('addWorkspaceButtonStateAtom', 'normal', on => [
    on(createWorkspace, () => 'preloader'),
    on(createWorkspace.done, () => 'normal'),
    on(createWorkspace.fail, () => 'normal'),
])

function WorkspacePickerPopover() {
    const currentWorkspace = useAtomWithSelector(sidebarAtom, x => x.currentWorkspace)
    const workspacesList = useAtomWithSelector(sidebarAtom, x => x.workspacesList)
    const addWorkspaceButtonState = useAtom(addWorkspaceButtonStateAtom)
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
            <ListBase
                items={listItems}
            />
            <ButtonText
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