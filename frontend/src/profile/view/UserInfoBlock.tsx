import {useAtom} from "@reatom/react";
import {authorizedUser} from "../../authentication/viewModel/userAtom";
import {AvatarWrapper} from "../../common/avatar/Avatar";


import styles from './UserInfoBlock.module.css'

function UserInfoBlock() {
    const user = useAtom(authorizedUser)

    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <AvatarWrapper
                    label={user.username}
                    size={'xLarge'}
                    avatarUrl={user.avatarUrl}
                    className={styles.avatar}
                />
                <div className={styles.userData}>
                    <div className={styles.nickname}>{user.username}</div>
                    <div className={styles.email}>{user.email}</div>
                </div>
            </div>
        </div>
    )
}

export {
    UserInfoBlock,
}