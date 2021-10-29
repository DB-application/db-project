import styles from './EditEventPopup.module.css'
import {Popup} from "../../../../common/popup/Popup";
import {Button_Text} from "../../../../common/button/Button_Text";
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
import {Checkbox_WithLabel} from "../../../../common/checkbox/Checkbox_WithLabel";
import {Preloader} from "../../../../common/preloader/Preloader";
import { WarningCircleIcon } from '../../../../icons/WarningCircleIcon';
import {useRef} from "react";
import {TooltipPortal} from "../../../../core/portal/TooltipPortal";

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
    return (
        <div className={joinClassNames(styles.dateContainer, className)}>
            <div className={styles.dateFieldDescription}>
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
        mode,
        allDay,
        endError,
        titleError,
    } = useAtom(editEventAtom)
    const handleSetTitle = useAction(editEventActions.setTitle)
    const handleSetStart = useAction(editEventActions.setStart)
    const handleSetEnd = useAction(editEventActions.setEnd)
    const handleSetDescription = useAction(editEventActions.setDescription)
    const handleRemove = useAction(editEventActions.removeEvent)
    const handleSetAllDay = useAction(editEventActions.setAllDay)

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
            <DateBlock
                fieldName={I18n_get('EditEventPopup.StartField')}
                date={start}
                setDate={handleSetStart}
                className={styles.contentBlock}
                timeDisabled={allDay}
                error={false}
            />
            <DateBlock
                fieldName={I18n_get('EditEventPopup.EndField')}
                date={end}
                setDate={handleSetEnd}
                className={styles.contentBlock}
                timeDisabled={allDay}
                error={endError}
            />
            <Checkbox_WithLabel
                checked={allDay}
                onCheckedChange={handleSetAllDay}
                label={I18n_get('EditEventPopup.AllDay')}
                className={styles.allDayBlock}
            />
            {
                mode === 'edit'
                    && <Button_Text
                        text={I18n_get('EditEventPopup.RemoveButton')}
                        onClick={handleRemove}
                        style={'danger'}
                    />
            }
        </div>
    )
}

function ContentWrapper() {
    const isPopupLoading = useAtomWithSelector(editEventAtom, x => x.isPopupLoading)

    const content = isPopupLoading
        ? <Preloader />
        : <Content />

    return (
        <div className={styles.container}>
            {content}
        </div>
    )
}

function EditEventPopup() {
    const mode = useAtomWithSelector(editEventAtom, x => x.mode)
    const submitButtonState = useAtomWithSelector(editEventAtom, x => x.submitButtonState)
    const handleClosePopup = useAction(editEventActions.close)
    const handleSubmit = useAction(editEventActions.submit)

    return <Popup
        type={'withHeaderAndFooter'}
        headerText={mode === 'edit'
            ? I18n_get('EditEventPopup.TitleEdit')
            : I18n_get('EditEventPopup.TitleAdd')}
        content={<ContentWrapper />}
        acceptButton={<Button_Text
            text={mode === 'edit'
                ? I18n_get('EditEventPopup.SubmitButtonEdit')
                : I18n_get('EditEventPopup.SubmitButtonCreate')}
            onClick={handleSubmit}
            style={'primary'}
            state={submitButtonState}
        />}
        closePopup={handleClosePopup}
    />
}

export {
    EditEventPopup,
}