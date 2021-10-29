import {useAction, useAtom} from "@reatom/react";
import {viewEventActions, viewEventAtom} from "../../../viewmodel/calendar/viewPopup/viewEvent";
import {Popup} from "../../../../common/popup/Popup";
import styles from './ViewEventPopup.module.css'
import {I18n_get} from "../../../../i18n/i18n_get";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import {UserList} from "../../../../common/userList/UserList";
import {UserType} from "../../../../user/UserType";


function InvitedUsersBlock() {
    const organizator: UserType = {
        id: '123',
        username: "Fenomen",
        email: 'email12 321@mail.ru',
        avatarUrl: '',
    }
    const users: Array<UserType> = [
        {
            id: '1',
            email: 'email12 321@mail.ru',
            username: 'user 1',
            avatarUrl: '',
        },
        {
            id: '2',
            email: 'email',
            username: 'pohui 1',
            avatarUrl: '',
        },
        {
            id: '1',
            email: 'email',
            username: 'jopa 1',
            avatarUrl: '',
        }
    ]

    return (
        <div className={styles.invitedUserBlock}>
            <div className={styles.userBlockLabel}>
                {I18n_get('ViewEventPopup.OrganizationBy')}
            </div>
            <UserInfo
                user={organizator}
                size={'small'}
                className={styles.organizator}
            />
            <div className={styles.userBlockLabel}>
                {I18n_get('ViewEventPopup.Collaborators')}
            </div>
            <UserList
                users={users}
                onClick={() => {}}
                className={styles.usersList}
            />
        </div>
    )
}

function Content() {
    const {
        title,
        start,
        end,
        description
    } = useAtom(viewEventAtom)

    const getDateString = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.infoLabel}>
                {I18n_get('ViewEventPopup.InfoLabel')}
            </div>
            <div className={styles.eventInfoContainer}>
                <div className={styles.eventData}>
                    <div className={styles.eventTitleContainer}>
                        <div className={styles.titleLabel}>
                            {I18n_get('ViewEventPopup.TitleLabel')}:
                        </div>
                        <div className={styles.eventTitle}>
                            {title}
                        </div>
                    </div>
                    <div className={styles.timeContainer}>
                        <div className={styles.whenTitle}>
                            {I18n_get('ViewEventPopup.WhenLabel')}:
                        </div>
                        <div className={styles.range}>
                            {getDateString(start)} - {getDateString(end)}
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.descriptionLabel}>
                            {I18n_get('ViewEventPopup.Description')}:
                        </div>
                        <div className={styles.description}>
                            {description}
                        </div>
                    </div>
                </div>
                <InvitedUsersBlock />
            </div>
        </div>
    )
}

function ViewEventPopup() {
    const handleViewEventPopup = useAction(viewEventActions.close)

    return <Popup
        type={"contentOnly"}
        content={<Content />}
        closePopup={handleViewEventPopup}
    />
}

export {
    ViewEventPopup
}