import styles from './PageHeader.module.css'
import {joinClassNames} from "../../../../core/styles/joinClassNames";

type PageHeaderProps = {
    title: string,
    className?: string,
}

function PageHeader({
    title,
    className,
}: PageHeaderProps) {
    return (
        <div className={joinClassNames(styles.header, className)}>
            {title}
        </div>
    )
}

export {
    PageHeader,
}