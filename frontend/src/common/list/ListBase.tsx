import styles from './ListBase.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames";


type ListItemProps = {
    id: string,
    createBindingFn: () => JSX.Element,
}

type ListProps = {
    items: Array<ListItemProps|null>,
    className?: string,
}

function Delimiter() {
    return (<div className={styles.divider}/>)
}

function ListItemWrapper({
    binding,
}: {binding: JSX.Element}) {
    return (
        <div
            className={styles.listItem}
        >
            {binding}
        </div>
    )
}

function ListBase({
    items,
    className,
}: ListProps) {
    const listBind: Array<JSX.Element> = items.map((item, index) => item
        ? <ListItemWrapper key={index} binding={item.createBindingFn()} />
        : <Delimiter key={index}/>
    )

    return (
        <div
            className={joinClassNames(styles.list, className)}
        >
            {listBind}
        </div>
    )
}

export {
    ListBase,
}

export type {
    ListProps,
    ListItemProps,
}