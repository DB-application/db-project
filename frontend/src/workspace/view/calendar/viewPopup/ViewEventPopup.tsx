import {useAction, useAtom} from "@reatom/react";
import {viewEventActions, viewEventAtom} from "../../../viewmodel/calendar/viewPopup/viewEvent";
import {Popup} from "../../../../common/popup/Popup";
import styles from './ViewEventPopup.module.css'
import {I18n_get} from "../../../../i18n/i18n_get";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import {UserList} from "../../../../common/userList/UserList";
import {UserInfoPopover} from "../../../../common/userInfo/UserInfoPopover";
import {PopoverPortal} from "../../../../core/portal/PopoverPortal";
import {useMemo, useRef, useState} from "react";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {calendarAtom} from "../../../viewmodel/calendar/calendar";
import {usersAtom} from "../../../../users/usersAtom";
import {ContainerWithPreloader} from "../../../../common/ContainerWithPreloader";


function InvitedUsersBlock() {
    const organizerRef = useRef<HTMLDivElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)
    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const eventId = useAtomWithSelector(viewEventAtom, x => x.eventId)
    const users = useAtom(usersAtom)
    const {organizerId, invitedUsersIds} = useMemo(() => events[eventId], [events, eventId])

    const usersData = useMemo(() => (
        invitedUsersIds.map(invited => users[invited])
    ), [invitedUsersIds, users])

    return (
        <div className={styles.invitedUserBlock}>
            <div className={styles.userBlockLabel}>
                {I18n_get('ViewEventPopup.OrganizationBy')}
            </div>
            <div ref={organizerRef}>
                <UserInfo
                    user={users[organizerId]}
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
                    user={users[organizerId]}
                />}
                side={'right'}
                align={'center'}
            />
            <div className={styles.userBlockLabel}>
                {I18n_get('ViewEventPopup.Collaborators')}
            </div>
            <UserList
                users={usersData}
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
    const events = useAtomWithSelector(calendarAtom, x => x.events)
    const eventId = useAtomWithSelector(viewEventAtom, x => x.eventId)

    const event = useMemo(() => events[eventId], [events, eventId])

    const getDateString = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    return (
        <div>
            <div className={styles.infoLabel}>
                {I18n_get('ViewEventPopup.InfoLabel')}
            </div>
            <div className={styles.eventInfoContainer}>
                <div className={styles.eventData}>
                    <InfoDataBlock
                        description={I18n_get('ViewEventPopup.TitleLabel')}
                        value={event.title}
                    />
                    {event.place && <InfoDataBlock
                        description={I18n_get('ViewEventPopup.PlaceLabel')}
                        value={event.place}
                    />}
                    <InfoDataBlock
                        description={I18n_get('ViewEventPopup.StartLabel')}
                        value={getDateString(event.start)}
                    />
                    <InfoDataBlock
                        description={I18n_get('ViewEventPopup.EndLabel')}
                        value={getDateString(event.end)}
                    />
                    {event.description && <DescriptionBlock
                        description={event.description}
                    />}
                </div>
                <InvitedUsersBlock />
            </div>
        </div>
    )
}

function ContentWrapper() {
    const isPopupLoading = useAtomWithSelector(viewEventAtom, x => x.isPopupLoading)

    return (
        <ContainerWithPreloader
            content={<Content />}
            isPopupLoading={isPopupLoading}
            className={styles.container}
        />
    )
}

function ViewEventPopup() {
    const handleViewEventPopup = useAction(viewEventActions.close)

    return <Popup
        type={"contentOnly"}
        content={<ContentWrapper />}
        closePopup={handleViewEventPopup}
    />
}

export {
    ViewEventPopup
}