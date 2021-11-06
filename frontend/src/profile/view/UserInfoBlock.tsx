import {useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../authentication/viewModel/currentUserAtom";


import styles from './UserInfoBlock.module.css'
import {UserInfo} from "../../common/userInfo/UserInfo";

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