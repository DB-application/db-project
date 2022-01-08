import {SelectListItemProps, SelectWithDropdown} from "../../../../common/selectList/SelectWithDropdown";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {editEventActions, editEventAtom} from "../../../viewmodel/calendar/editPopup/editEvent";
import {useAction} from "@reatom/react";
import {I18n_get} from "../../../../i18n/i18n_get";
import styles from './RepeatableBlock.module.css'


function RepeatableBlock() {
    const repeatableType = useAtomWithSelector(editEventAtom, x => x.repeatableType)
    const handleSetRepeatableType = useAction(editEventActions.setRepeatableType)

    const items: Array<SelectListItemProps> = [
        {
            id: 'none',
            text: I18n_get('EditEventPopup.RepeatableNone'),
            onClick: () => handleSetRepeatableType('none'),
            className: styles.item,
        },
        {
            id: 'everyDay',
            text: I18n_get('EditEventPopup.RepeatableEveryDay'),
            onClick: () => handleSetRepeatableType('everyDay'),
            className: styles.item,
        },
        {
            id: 'everyWeek',
            text: I18n_get('EditEventPopup.RepeatableEveryWeek'),
            onClick: () => handleSetRepeatableType('everyWeek'),
            className: styles.item,
        },
        {
            id: 'everyMonth',
            text: I18n_get('EditEventPopup.RepeatableEveryMonth'),
            onClick: () => handleSetRepeatableType('everyMonth'),
            className: styles.item,
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                {I18n_get('EditEventPopup.Repeat')}
            </div>
            <SelectWithDropdown
                items={items}
                selected={repeatableType}
            />
        </div>
    )
}

export {
    RepeatableBlock,
}