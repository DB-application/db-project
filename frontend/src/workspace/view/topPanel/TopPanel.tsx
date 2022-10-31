import {Logo} from '../../../icons/Logo'
import styles from './TopPanel.module.css'
import {RightTopPanelPart} from "./RightTopPanelPart";
import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {workspaceLayoutActions, workspaceLayoutAtom} from "../../viewmodel/workspaceLoading";
import {useAction} from "@reatom/react";
import {ButtonIcon} from "../../../common/button/ButtonIcon";
import {MenuBurgerIcon} from "../../../icons/MenuBurgerIcon";

function TopPanel() {
    const showSidebar = useAtomWithSelector(workspaceLayoutAtom, x => x.showSidebar)
    const handleSetShowSidebar = useAction(workspaceLayoutActions.setShowSidebar)
    return (
        <div className={styles.topPanel}>
            <ButtonIcon
                icon={<MenuBurgerIcon />}
                onClick={() => handleSetShowSidebar(!showSidebar)}
                style={"link"}
                size={'small'}
                spacing={false}
                className={styles.menuButton}
            />
            <div className={styles.logoContainer}>
                <Logo />
            </div>
            <RightTopPanelPart />
        </div>
    )
}

export {
    TopPanel,
}