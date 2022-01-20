import {Route, Switch, useRouteMatch} from 'react-router-dom'
import styles from './WorkArea.module.css'
import {CalendarWrapper} from "../calendar/CalendarWrapper";
import {NoteAreaWrapper} from "../noteArea/NoteAreaWrapper";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {workspaceLayoutActions, workspaceLayoutAtom} from "../../viewmodel/workspaceLoading";
import {useAction} from "@reatom/react";
import {Button_Icon} from "../../../common/button/Button_Icon";
import {ArrowRight} from "../../../icons/ArrowRight";
import { I18n_get } from '../../../i18n/i18n_get';

function OpenPanelButton() {
    const showPanel = useAtomWithSelector(workspaceLayoutAtom, x => x.showSidebar)
    const handleSetShowPanel = useAction(workspaceLayoutActions.setShowSidebar)

    return (
        <div className={styles.openPanelButtonWrapper}>
            {!showPanel && <Button_Icon
                icon={<ArrowRight />}
                onClick={() => handleSetShowPanel(true)}
                style={'link'}
                className={styles.openPanelButton}
                tooltipText={I18n_get('Sidebar.ShowPanel')}
            />}
        </div>
    )
}

function WorkArea() {
    const { path } = useRouteMatch();

    return (
        <div className={styles.areaContainer}>
            {<OpenPanelButton/>}
            <Switch>
                <Route path={`${path}/calendar`}>
                    <CalendarWrapper />
                </Route>
                <Route path={`${path}/note/:noteId`}>
                    <NoteAreaWrapper />
                </Route>
                <Route path={`${path}/chat`}>
                    Чат
                </Route>
                <Route path={`${path}/`}>
                    Вступительная
                </Route>
            </Switch>
        </div>
    )
}

export {
    WorkArea,
}