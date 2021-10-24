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

type DateBlockProps = {
    fieldName: string,
    date: Date,
    setDate: (value: Date) => void,
    className?: string,
}

function DateBlock({
    date,
    setDate,
    fieldName,
    className,
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
                />
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
    } = useAtom(editEventAtom)
    const handleSetTitle = useAction(editEventActions.setTitle)
    const handleSetStart = useAction(editEventActions.setStart)
    const handleSetEnd = useAction(editEventActions.setEnd)
    const handleSetDescription = useAction(editEventActions.setDescription)

    return (
        <div className={styles.container}>
            <TextField
                description={I18n_get('EditEventPopup.TitleField')}
                value={title}
                onChange={handleSetTitle}
                className={styles.contentBlock}
            />
            <TextField
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
            />
            <DateBlock
                fieldName={I18n_get('EditEventPopup.EndField')}
                date={end}
                setDate={handleSetEnd}
                className={styles.contentBlock}
            />
        </div>
    )
}

function EditEventPopup() {
    const mode = useAtomWithSelector(editEventAtom, x => x.mode)
    const handleClosePopup = useAction(editEventActions.close)
    const handleSubmit = useAction(editEventActions.submit)

    return <Popup
        headerText={mode == 'edit'
            ? I18n_get('EditEventPopup.TitleEdit')
            : I18n_get('EditEventPopup.TitleAdd')}
        content={<Content />}
        acceptButton={<Button_Text
            text={mode == 'edit'
                ? I18n_get('EditEventPopup.SubmitButtonEdit')
                : I18n_get('EditEventPopup.SubmitButtonCreate')}
            onClick={() => {
                handleSubmit()
                handleClosePopup()
            }}
        />}
        closePopup={handleClosePopup}
    />
}

export {
    EditEventPopup,
}