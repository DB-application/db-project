import styles from './EditEventPopup.module.css'
import {Popup} from "../../../../common/popup/Popup";
import {ButtonText} from "../../../../common/button/ButtonText";
import {useAction, useAtom} from "@reatom/react";
import {editEventActions, editEventAtom} from '../../../viewmodel/calendar/editPopup/editEvent';
import {TextField} from "../../../../common/textfield/TextField";
import {I18n_get} from "../../../../i18n/i18n_get";
import {TimePicker} from "../../../../common/picker/TimePicker";
import {convertTimeToDate} from '../../../../common/picker/converters';
import {joinClassNames} from "../../../../core/styles/joinClassNames";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {TextArea} from "../../../../common/textArea/TextArea";
import {WarningCircleIcon} from '../../../../icons/WarningCircleIcon';
import {useRef} from "react";
import {TooltipPortal} from "../../../../core/portal/TooltipPortal";
import {ContainerWithPreloader} from "../../../../common/ContainerWithPreloader";
import {InvitedUsersBlock} from '../../common/invitedUsersBlock/InvitedUsersBlock';
import {RepeatableBlock} from './RepeatableBlock';
import {authorizedCurrentUser} from "../../../../authentication/viewModel/currentUserAtom";

type DateBlockProps = {
    fieldName: string,
    date: Date,
    setDate: (value: Date) => void,
    className?: string,
    timeDisabled: boolean,
    error: boolean
}

function DateErrorIcon() {
    const ref = useRef<HTMLDivElement|null>(null)

    return (
        <div className={styles.dateWarningIcon} ref={ref}>
            <WarningCircleIcon />
            <TooltipPortal
                elementRef={ref}
                text={'Окончания события раньше начала'}
                side={'left'}
            />
        </div>
    )
}

function DateBlock({
    date,
    setDate,
    fieldName,
    className,
    timeDisabled,
    error,
}: DateBlockProps) {
    const repeatableType = useAtomWithSelector(editEventAtom, x => x.repeatableType)
    return (
        <div className={joinClassNames(styles.dataContainer, className)}>
            <div className={styles.fieldDescription}>
                {fieldName}
            </div>
            <div className={styles.dateRow}>
                <div className={styles.datePickerLabel}>
                    {I18n_get('EditEventPopup.DateLabel')}
                </div>
                <ReactDatePicker
                    selected={date}
                    onChange={(date) => {
                        date && setDate(date as Date)
                    }}
                    className={styles.calendarInput}
                    disabled={repeatableType !== 'none'}
                />
                <div className={styles.timePickerLabel}>
                    {I18n_get('EditEventPopup.TimeLabel')}
                </div>
                <TimePicker
                    time={{
                        hours: date.getHours(),
                        minutes: date.getMinutes(),
                    }}
                    minutesStep={5}
                    onChange={time => setDate(convertTimeToDate(date, time))}
                    className={styles.timePicker}
                    disabled={timeDisabled}
                />
                {error && <DateErrorIcon />}
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
        endError,
        titleError,
        place,
        invitedUsers,
    } = useAtom(editEventAtom)
    const currentUser = useAtom(authorizedCurrentUser)
    const handleSetTitle = useAction(editEventActions.setTitle)
    const handleSetStart = useAction(editEventActions.setStart)
    const handleSetPlace = useAction(editEventActions.setPlace)
    const handleSetEnd = useAction(editEventActions.setEnd)
    const handleSetDescription = useAction(editEventActions.setDescription)
    const handleRemoveInvitedUser = useAction(editEventActions.removeInvitedUser)

    return (
        <div className={styles.content}>
            <TextField
                description={I18n_get('EditEventPopup.TitleField')}
                value={title}
                onChange={handleSetTitle}
                className={styles.contentBlock}
                errorText={titleError
                    ? I18n_get('EditEventPopup.TitleRequired')
                    : ''}
            />
            <TextArea
                description={I18n_get('EditEventPopup.DescriptionField')}
                value={description}
                onChange={handleSetDescription}
                className={styles.contentBlock}
            />
            <TextField
                description={I18n_get('EditEventPopup.PlaceField')}
                value={place}
                onChange={handleSetPlace}
                className={styles.contentBlock}
            />
            <DateBlock
                fieldName={I18n_get('EditEventPopup.StartField')}
                date={start}
                setDate={handleSetStart}
                className={styles.contentBlock}
                timeDisabled={false}
                error={false}
            />
            <DateBlock
                fieldName={I18n_get('EditEventPopup.EndField')}
                date={end}
                setDate={handleSetEnd}
                className={styles.contentBlock}
                timeDisabled={false}
                error={endError}
            />
            <RepeatableBlock/>
            <InvitedUsersBlock
                popupType={'event'}
                organizerId={currentUser.id}
                invitedUsers={Array.from(invitedUsers)}
                removeUserCallback={handleRemoveInvitedUser}
            />
        </div>
    )
}

function ContentWrapper() {
    const isPopupLoading = useAtomWithSelector(editEventAtom, x => x.isPopupLoading)

    return (
        <ContainerWithPreloader
            content={<Content />}
            isPopupLoading={isPopupLoading}
            className={styles.container}
        />
    )
}

function EditEventPopup() {
    const mode = useAtomWithSelector(editEventAtom, x => x.mode)
    const submitButtonState = useAtomWithSelector(editEventAtom, x => x.submitButtonState)
    const handleClosePopup = useAction(editEventActions.close)
    const handleSubmit = useAction(editEventActions.submit)
    const handleRemove = useAction(editEventActions.removeEvent)
    return <Popup
        type={'withHeaderAndFooter'}
        headerText={mode === 'edit'
            ? I18n_get('EditEventPopup.TitleEdit')
            : I18n_get('EditEventPopup.TitleAdd')}
        content={<ContentWrapper />}
        acceptButton={<ButtonText
            text={mode === 'edit'
                ? I18n_get('EditEventPopup.SubmitButtonEdit')
                : I18n_get('EditEventPopup.SubmitButtonCreate')}
            onClick={handleSubmit}
            style={'primary'}
            state={submitButtonState}
        />}
        closePopup={handleClosePopup}
        extraButton={mode === 'edit'
            ? <ButtonText
                text={I18n_get('EditEventPopup.RemoveButton')}
                onClick={handleRemove}
                state={submitButtonState}
                style={'danger'}
            />
            : undefined
        }
    />
}

export {
    EditEventPopup,
}