import {UserData} from "../UserData";
import {AvatarSize, AvatarWrapper} from "../avatar/Avatar";
import styles from './UserInfo.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";

type UserInfoProps = {
    user: UserData,
    size: 'xSmall'|'small'|'normal'|'large',
    onClick?: () => void,
    className?: string,
}

function UserInfo({
    user,
    size,
    onClick,
    className,
}: UserInfoProps) {

    let avatarSize: AvatarSize
    switch (size) {
        case 'small':
            avatarSize = 'small'
            break
        case "xSmall":
            avatarSize = 'xSmall'
            break
        case "normal":
            avatarSize = 'normal'
            break
        case "large":
            avatarSize = 'xLarge'
            break
    }

    const _onClick = () => {
        onClick && onClick()
    }

    const infoClassName = getStylesWithMods(styles.info, {
        [styles.infoXSmall]: size === 'xSmall',
        [styles.infoSmall]: size === 'small',
        [styles.infoNormal]: size === 'normal',
        [styles.infoLarge]: size === 'large',
    })

    return (
        <div
            className={joinClassNames(infoClassName, className)}
            onClick={_onClick}
        >
            <AvatarWrapper
                label={user.username}
                size={avatarSize}
                avatarUrl={user.avatarUrl}
                className={styles.avatar}
            />
            <div className={styles.userData}>
                <div className={styles.nickname}>
                    <div className={styles.name}>
                        {user.username}
                    </div>
                </div>
                <div className={styles.email}>{user.email}</div>
            </div>
        </div>
    )
}

export {
    UserInfo,
}

export type {
    UserInfoProps,
}