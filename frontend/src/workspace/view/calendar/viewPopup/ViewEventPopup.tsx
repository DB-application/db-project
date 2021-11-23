import {useAction, useAtom} from "@reatom/react";
import {viewEventActions, viewEventAtom} from "../../../viewmodel/calendar/viewPopup/viewEvent";
import {Popup} from "../../../../common/popup/Popup";
import styles from './ViewEventPopup.module.css'
import {I18n_get} from "../../../../i18n/i18n_get";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import {UserList} from "../../../../common/userList/UserList";
import {UserData} from "../../../../common/UserData";
import {UserInfoPopover} from "../../../../common/userInfo/UserInfoPopover";
import {PopoverPortal} from "../../../../core/portal/PopoverPortal";
import {useRef, useState} from "react";


function InvitedUsersBlock() {
    const organizerRef = useRef<HTMLDivElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)

    const organizator: UserData = {
        id: '123',
        username: "Fenomen",
        email: 'email12 321@mail.ru',
        avatarUrl: '',
    }
    const users: Array<UserData> = [
        {
            id: '1',
            email: 'email12321123123w@mail.ru',
            firstName: 'Эльдар',
            lastName: 'Мухаметханов',
            phone: '89021025370',
            username: 'email12321123123w 123 ',
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
            <div ref={organizerRef}>
                <UserInfo
                    user={organizator}
                    size={'xSmall'}
                    onClick={() => setPopoverOpened(true)}
                    className={styles.organizator}
                />
            </div>
            <PopoverPortal
                elementRef={organizerRef}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<UserInfoPopover
                    user={organizator}
                />}
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

type InfoDataBlock = {
    description: string,
    value: string,
}

function InfoDataBlock({
    value,
    description,
}: InfoDataBlock) {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoTitle}>
                {description}:
            </div>
            <div className={styles.infoValue}>
                {value}
            </div>
        </div>
    )
}

type DescriptionBlockProps = {
    description: string,
}

function DescriptionBlock({
    description,
}: DescriptionBlockProps) {
    return (
        <div className={styles.descriptionContainer}>
            <div className={styles.infoTitle}>
                {I18n_get('ViewEventPopup.Description')}:
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}

function Content() {
    const {
        title,
        start,
        end,
        description,
        place,
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
                    <InfoDataBlock
                        description={I18n_get('ViewEventPopup.TitleLabel')}
                        value={title}
                    />
                    {place && <InfoDataBlock
                        description={I18n_get('ViewEventPopup.PlaceLabel')}
                        value={place}
                    />}
                    <InfoDataBlock
                        description={I18n_get('ViewEventPopup.StartLabel')}
                        value={getDateString(start)}
                    />
                    <InfoDataBlock
                        description={I18n_get('ViewEventPopup.EndLabel')}
                        value={getDateString(end)}
                    />
                    {description && <DescriptionBlock
                        description={description}
                    />}
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