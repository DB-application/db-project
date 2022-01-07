import {Button_Icon} from "../../../common/button/Button_Icon";
import {SettingsIcon} from "../../../icons/SettingsIcon";
import {I18n_get} from '../../../i18n/i18n_get';
import {CalendarMonthOutlineIcon} from "../../../icons/CalendarMonthOutlineIcon";
import {ChatLeftDotsIcon} from '../../../icons/ChatLeftDotsIcon';
import styles from './RightTopPanelPart.module.css'
import {UserMenu} from "./userMeno/UserMenu";
import {Router} from "../../../core/router/router";
import {useAction} from "@reatom/react";
import {settingsPopupActions} from "../../viewmodel/settingsPopup/settingsPopup";


function RightTopPanelPart() {
    const handleOpenSettingsPopup = useAction(settingsPopupActions.open)
    return (
        <div className={styles.container}>
            <div className={styles.buttonsGroup}>
                <Button_Icon
                    icon={<ChatLeftDotsIcon/>}
                    onClick={Router.Chat.open}
                    tooltipText={I18n_get('Workspace.ChatButtonTooltip')}
                    size={'small'}
                    style={'link'}
                    className={styles.buttonsGroupButton}
                />
                <Button_Icon
                    icon={<CalendarMonthOutlineIcon />}
                    onClick={Router.Calendar.open}
                    tooltipText={I18n_get('Workspace.CalendarButtonTooltip')}
                    size={'small'}
                    style={'link'}
                    className={styles.buttonsGroupButton}
                />
                <Button_Icon
                    icon={<SettingsIcon />}
                    onClick={() => handleOpenSettingsPopup('profile')}
                    tooltipText={I18n_get('Workspace.SettingButtonTooltip')}
                    className={styles.buttonsGroupButton}
                    size={'small'}
                    style={'link'}
                />
            </div>
            <UserMenu />
        </div>
    )
}

export {
    RightTopPanelPart,
}