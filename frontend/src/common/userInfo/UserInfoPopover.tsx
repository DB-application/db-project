import {UserType} from "../../user/UserType";
import styles from './UserInfoPopover.module.css'
import {AvatarWrapper} from "../avatar/Avatar";

type UserInfoPopoverProps = {
    user: UserType,
}

type InfoBlockProps = {
    description: string,
    value: string,
}

function InfoBlock({
    description,
    value,
}: InfoBlockProps) {
    return (
        <div className={styles.infoBlock}>
            <div className={styles.infoDescription}>
                {description}:
            </div>
            <div className={styles.infoValue}>
                {value}
            </div>
        </div>
    )
}

function UserInfoPopover({
    user,
}: UserInfoPopoverProps) {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <AvatarWrapper
                    label={user.username}
                    size={"xSmall"}
                    className={styles.avatar}
                />
                <div className={styles.nickname}>
                    {user.username}
                </div>
            </div>
            <div className={styles.info}>
                <InfoBlock
                    description={'Почта'}
                    value={user.email}
                />
                {user.firstName && <InfoBlock
                    description={'Имя'}
                    value={user.firstName}
                />}
                {user.lastName && <InfoBlock
                    description={'Фамилия'}
                    value={user.lastName}
                />}
                {user.phone && <InfoBlock
                    description={'Телефон'}
                    value={user.phone}
                />}
            </div>
        </div>
    )
}

export {
    UserInfoPopover,
}