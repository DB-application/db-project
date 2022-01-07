import styles from './SettingBlock.module.css'
import {joinClassNames} from "../../../../core/styles/joinClassNames";


type SettingBlockProps = {
    title: string,
    description: string,
    binding: JSX.Element,
    className?: string,
}

function SettingBlock({
    description,
    title,
    binding,
    className,
}: SettingBlockProps) {

    return (
        <div className={joinClassNames(styles.blockWrapper, className)}>
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
            {binding}
        </div>
    )
}

export {
    SettingBlock,
}