import {Route, Switch, useRouteMatch} from 'react-router-dom'
import styles from './WorkArea.module.css'
import {CalendarWrapper} from "../calendar/CalendarWrapper";
import {NoteAreaWrapper} from "../noteArea/NoteAreaWrapper";

function WorkArea() {
    const { path } = useRouteMatch();

    return (
        <div className={styles.areaContainer}>
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