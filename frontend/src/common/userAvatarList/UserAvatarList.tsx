import {UserData} from "../UserData";
import styles from './UserAvatarList.module.css'
import React, {useRef, useState} from "react";
import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {UserList} from "../userList/UserList";
import {AvatarList} from "../avatarList/AvatarList";
import {AvatarWrapper} from "../avatar/Avatar";
import {joinClassNames} from "../../core/styles/joinClassNames";

type UserAvatarsListProps = {
    users: Array<UserData>,
    className?: string,
}

type UserAvatarsListCounterProps = {
    counter: number,
    onClick: () => void,
}

const UserAvatarsListCounter = React.forwardRef<HTMLDivElement|null, UserAvatarsListCounterProps>((props, ref) => {
    return (
        <div ref={ref}>
            <AvatarWrapper
                label={`+ ${props.counter}`}
                size={'xSmall'}
                onClick={props.onClick}
            />
        </div>
    )
})

function UserAvatarsList({
    users,
    className,
}: UserAvatarsListProps) {
    const ref = useRef<HTMLDivElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState(false)

    return (
        <>
            <div className={joinClassNames(styles.avatarList, className)}>
                <AvatarList
                    avatarsData={users.map(user => ({
                        label: user.username,
                        avatarUrl: user.avatarUrl,
                        size: 'xSmall',
                    }))}
                    getCounterBinding={counter => counter > 0
                        ? <UserAvatarsListCounter
                            counter={counter}
                            onClick={() => setPopoverOpened(true)}
                            ref={ref}
                        />
                        : null
                    }
                />
            </div>
            <PopoverPortal
                elementRef={ref}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<UserList
                    users={users}
                    onClick={() => {}}
                    className={styles.userList}
                />}
                align={'left'}
            />
        </>
    )
}

export {
    UserAvatarsList,
}

export type {
    UserAvatarsListProps,
}