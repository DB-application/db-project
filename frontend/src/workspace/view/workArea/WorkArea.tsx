import {useRouteMatch, Switch, Route} from 'react-router-dom'

import styles from './WorkArea.module.css'

function WorkArea() {
    const { path } = useRouteMatch();

    return (
        <div className={styles.areaContainer}>
            <Switch>
                <Route path={`${path}/calendar`}>
                    Календарь
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