import {Button_Icon} from "../../../common/button/Button_Icon";
import {SettingsIcon} from "../../../icons/SettingsIcon";
import {I18n_get} from '../../../i18n/i18n_get';
import {CalendarMonthOutlineIcon} from "../../../icons/CalendarMonthOutlineIcon";
import {ChatLeftDotsIcon} from '../../../icons/ChatLeftDotsIcon';
import {useRouteMatch} from 'react-router-dom'
import styles from './RightTopPanelPart.module.css'
import {UserMenu} from "./userMeno/UserMenu";
import {ComponentWithLink} from "../../../common/ComponentWithLink";


function RightTopPanelPart() {
    const {path} = useRouteMatch()
    return (
        <div className={styles.container}>
            <div className={styles.buttonsGroup}>
                <ComponentWithLink
                    component={<Button_Icon
                        icon={<ChatLeftDotsIcon/>}
                        onClick={() => {}}
                        tooltipText={I18n_get('Workspace.ChatButtonTooltip')}
                        size={'small'}
                        style={'link'}
                    />}
                    path={`${path}/chat`}
                    className={styles.buttonsGroupButton}
                />
                <ComponentWithLink
                    component={ <Button_Icon
                        icon={<CalendarMonthOutlineIcon />}
                        onClick={() => {}}
                        tooltipText={I18n_get('Workspace.CalendarButtonTooltip')}
                        size={'small'}
                        style={'link'}
                    />}
                    path={`${path}/calendar`}
                    className={styles.buttonsGroupButton}
                />
                <Button_Icon
                    icon={<SettingsIcon />}
                    onClick={() => {}}
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