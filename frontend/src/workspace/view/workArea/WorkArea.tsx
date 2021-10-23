import {Route, Switch, useRouteMatch} from 'react-router-dom'
import styles from './WorkArea.module.css'
import {CalendarWrapper} from "../calendar/CalendarWrapper";

function WorkArea() {
    const { path } = useRouteMatch();

    return (
        <div className={styles.areaContainer}>
            <Switch>
                <Route path={`${path}/calendar`}>
                    <CalendarWrapper />
                </Route>
                <Route path={`${path}/note`}>
                    Заметка
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