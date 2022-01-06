import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {editWorkspacePopupActions, editWorkspacePopupAtom} from "../../viewmodel/editWorkspacePopup/editWorkspacePopup";
import {Popup} from "../../../common/popup/Popup";
import {I18n_get} from "../../../i18n/i18n_get";
import {Button_Text} from "../../../common/button/Button_Text";
import {ContainerWithPreloader} from "../../../common/ContainerWithPreloader";
import styles from './EditWorkspacePopup.module.css'
import {TextField} from "../../../common/textfield/TextField";
import {InvitedUsersBlock} from "../common/invitedUsersBlock/InvitedUsersBlock";
import {workspacesAtom} from "../../viewmodel/workspace/workspace";


function Content() {
    const workspaceName = useAtomWithSelector(editWorkspacePopupAtom, x => x.workspaceName)
    const workspaceId = useAtomWithSelector(editWorkspacePopupAtom, x => x.workspaceId)
    const invitedUsers = useAtomWithSelector(editWorkspacePopupAtom, x => x.invitedUsers)

    const handleSetWorkspaceName = useAction(editWorkspacePopupActions.setWorkspaceName)
    const handleRemoveInvitedUser = useAction(editWorkspacePopupActions.removeInvitedUser)

    const workspaces = useAtom(workspacesAtom)
    const currentWorkspace = workspaces[workspaceId]

    return (
        <div className={styles.content}>
            <TextField
                description={I18n_get('EditWorkspacePopup.WorkspaceName')}
                value={workspaceName}
                onChange={handleSetWorkspaceName}
                className={styles.contentBlock}
            />
            <InvitedUsersBlock
                organizerId={currentWorkspace.ownerId}
                popupType={'workspace'}
                invitedUsers={Array.from(invitedUsers)}
                removeUserCallback={handleRemoveInvitedUser}
            />
        </div>
    )
}

function ContentWrapper() {
    const isPopupLoading = useAtomWithSelector(editWorkspacePopupAtom, x => x.isPopupLoading)

    return (
        <ContainerWithPreloader
            content={<Content />}
            isPopupLoading={isPopupLoading}
            className={styles.container}
        />
    )
}

function EditWorkspacePopup() {
    const submitButtonState = useAtomWithSelector(editWorkspacePopupAtom, x => x.submitButtonState)
    const handleClosePopup = useAction(editWorkspacePopupActions.close)
    const handleSubmit = useAction(editWorkspacePopupActions.submit)

    return <Popup
        type={'withHeaderAndFooter'}
        headerText={I18n_get('EditWorkspacePopup.Title')}
        content={<ContentWrapper />}
        acceptButton={<Button_Text
            text={I18n_get('EditWorkspacePopup.SubmitButton')}
            onClick={handleSubmit}
            style={'primary'}
            state={submitButtonState}
        />}
        closePopup={handleClosePopup}
    />
}

export {
    EditWorkspacePopup,
}