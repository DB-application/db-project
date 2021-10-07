import styles from './List_Base.module.css'


type ListItemProps = {
    id: string,
    createBindingFn: () => JSX.Element,
}

type ListProps = {
    items: Array<ListItemProps|null>,
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

function List_Base({
    items,
}: ListProps) {
    const listBind: Array<JSX.Element> = items.map((item, index) => item
        ? <ListItemWrapper key={index} binding={item.createBindingFn()} />
        : <Delimiter key={index}/>
    )

    return (
        <div
            className={styles.list}
        >
            {listBind}
        </div>
    )
}

export {
    List_Base,
}

export type {
    ListProps,
    ListItemProps,
}