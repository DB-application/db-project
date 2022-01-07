import {useState} from "react";
import {SettingBlock} from "../common/SettingBlock";
import {I18n_get} from "../../../../i18n/i18n_get";
import {SelectListItemProps, SelectWithDropdown} from "../../../../common/selectList/SelectWithDropdown";
import {
    getRtlFromLocalStorage,
    getStepFromLocalStorage, getTimeslotsFromLocalStorage, resetSettings,
    setRtlInLocalStorage,
    setStepInLocalStorage, setTimeslotsInLocalStorage
} from "./calendarSettingsChange";
import {Checkbox} from "../../../../common/checkbox/Checkbox";
import styles from './CalendarSettingsPage.module.css'
import {Button_Text} from "../../../../common/button/Button_Text";


const allSteps = [5, 10, 15, 30, 45, 60]
const allTimeSlots = [1, 2, 3, 4, 5, 6, 7]

type StepBlockProps = {
    setStep: (step: number) => void,
    step: number
}

function StepBlock({
    setStep,
    step,
}: StepBlockProps) {
    const items: Array<SelectListItemProps> = allSteps.map(stepItem => ({
        id: String(stepItem),
        text: String(stepItem),
        onClick: () => {
            setStep(stepItem)
            setStepInLocalStorage(stepItem)
        }
    }))

    return (
        <SettingBlock
            title={I18n_get('SettingsPopup.StepTitle')}
            description={I18n_get('SettingsPopup.StepDescription')}
            binding={<SelectWithDropdown
                items={items}
                selected={String(step)}
            />}
            className={styles.block}
        />
    )
}

type RtlBlockProps = {
    setRtl: (rtl: boolean) => void,
    rtl: boolean,
}

function RtlBlock({
    rtl,
    setRtl,
}: RtlBlockProps) {
    return (
        <SettingBlock
            title={I18n_get('SettingsPopup.RtlTitle')}
            description={I18n_get('SettingsPopup.RtlDescription')}
            binding={<Checkbox
                checked={rtl}
                onCheckedChange={(checked) => {
                    setRtl(checked)
                    setRtlInLocalStorage(checked)
                }}
            />}
            className={styles.block}
        />
    )
}

type TimeSlotsProps = {
    setTimeSlots: (timeSlots: number) => void,
    timeslots: number,
}

function TimeSlotsBlock({
    setTimeSlots,
    timeslots,
}: TimeSlotsProps) {
    const items: Array<SelectListItemProps> = allTimeSlots.map(timeslotItem => ({
        id: String(timeslotItem),
        text: String(timeslotItem),
        onClick: () => {
            setTimeSlots(timeslotItem)
            setTimeslotsInLocalStorage(timeslotItem)
        }
    }))

    return(
        <SettingBlock
            title={I18n_get('SettingsPopup.TimeSlotsTitle')}
            description={I18n_get('SettingsPopup.TimeSlotsDescription')}
            binding={<SelectWithDropdown
                items={items}
                selected={String(timeslots)}
            />}
            className={styles.block}
        />
    )
}


function CalendarSettingsPage() {
    const [step, setStep] = useState<number>(getStepFromLocalStorage())
    const [rtl, setRtl] = useState<boolean>(getRtlFromLocalStorage())
    const [timeslots, setTimeSlots] = useState<number>(getTimeslotsFromLocalStorage())

    return (
        <>
            <StepBlock
                setStep={setStep}
                step={step}
            />
            <RtlBlock
                rtl={rtl}
                setRtl={setRtl}
            />
            <TimeSlotsBlock
                setTimeSlots={setTimeSlots}
                timeslots={timeslots}
            />
            <Button_Text
                text={I18n_get('SettingsPopup.ResetCalendarSettings')}
                onClick={() => {
                    resetSettings()
                    setTimeSlots(getTimeslotsFromLocalStorage())
                    setStep(getStepFromLocalStorage())
                    setRtl(getRtlFromLocalStorage())
                }}
                style={'secondary'}
            />
        </>
    )
}

export {
    CalendarSettingsPage,
}