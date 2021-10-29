import {useAtom} from "@reatom/react";
import {authorizedUser} from "../../authentication/viewModel/userAtom";


import styles from './UserInfoBlock.module.css'
import {UserInfo} from "../../common/userInfo/UserInfo";

function UserInfoBlock() {
    const user = useAtom(authorizedUser)

    return <UserInfo
        user={user}
        size={'large'}
        className={styles.container}
    />
}

export {
    UserInfoBlock,
}