import { Logo } from '../../../icons/Logo'
import styles from './TopPanel.module.css'
import {RightTopPanelPart} from "./RightTopPanelPart";

function TopPanel() {

    return (
        <div className={styles.topPanel}>
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