import {SettingBlock} from "../common/SettingBlock";
import {I18n_get} from "../../../../i18n/i18n_get";
import {SelectListItemProps, SelectWithDropdown} from "../../../../common/selectList/SelectWithDropdown";
import {Checkbox} from "../../../../common/checkbox/Checkbox";
import styles from './CalendarSettingsPage.module.css'
import {Button_Text} from "../../../../common/button/Button_Text";
import {useAction} from "@reatom/react";
import {calendarSettingsAction, calendarSettingsAtom} from "../../../viewmodel/calendar/calendarSettings";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {PageHeader} from "../common/PageHeader";
import {Toggle} from "../../../../common/toggle/Toggle";


const allSteps = [5, 10, 15, 30, 45, 60]
const allTimeSlots = [1, 2, 3, 4, 5, 6, 7]


function StepBlock() {
    const step = useAtomWithSelector(calendarSettingsAtom, x => x.step)
    const handleSetStep = useAction(calendarSettingsAction.setStep)
    const items: Array<SelectListItemProps> = allSteps.map(stepItem => ({
        id: String(stepItem),
        text: String(stepItem),
        onClick: () => handleSetStep(stepItem)
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

function RtlBlock() {
    const rtl = useAtomWithSelector(calendarSettingsAtom, x => x.rtl)
    const handleSetRtl = useAction(calendarSettingsAction.setRtl)
    return (
        <SettingBlock
            title={I18n_get('SettingsPopup.RtlTitle')}
            description={I18n_get('SettingsPopup.RtlDescription')}
            binding={<Toggle
                checked={rtl}
                onCheckedChange={(checked) => handleSetRtl(checked)}
            />}
            className={styles.block}
        />
    )
}

function TimeSlotsBlock() {
    const timeslots = useAtomWithSelector(calendarSettingsAtom, x => x.timeslots)
    const handleSetTimeslots = useAction(calendarSettingsAction.setTimeslots)
    const items: Array<SelectListItemProps> = allTimeSlots.map(timeslotItem => ({
        id: String(timeslotItem),
        text: String(timeslotItem),
        onClick: () => handleSetTimeslots(timeslotItem)
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
    const handleResetSettings = useAction(calendarSettingsAction.resetSettings)
    return (
        <>
            <PageHeader
                title={I18n_get('SettingsPopup.Language')}
            />
            <StepBlock/>
            <RtlBlock/>
            <TimeSlotsBlock/>
            <Button_Text
                text={I18n_get('SettingsPopup.ResetCalendarSettings')}
                onClick={() => handleResetSettings()}
                style={'secondary'}
            />
        </>
    )
}

export {
    CalendarSettingsPage,
}