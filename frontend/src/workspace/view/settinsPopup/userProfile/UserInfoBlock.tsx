import {useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../../../authentication/viewModel/currentUserAtom";
import {UserInfo} from "../../../../common/userInfo/UserInfo";
import styles from './UserInfoBlock.module.css'

function UserInfoBlock() {
    const user = useAtom(authorizedCurrentUser)

    return <UserInfo
        user={user}
        size={'large'}
        className={styles.container}
    />
}

export {
    UserInfoBlock,
}