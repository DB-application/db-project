import styles from './Prealoder.module.css'
import {BxLoaderAltIcon} from "../../icons/BxLoaderAltIcon";
import {joinClassNames} from "../../core/styles/joinClassNames";

type PreloaderProps = {
    className?: string,
}

function PreloaderIcon() {
    return (
        <div>
            <BxLoaderAltIcon/>
        </div>
    )
}

function Preloader({
    className
}: PreloaderProps) {
    return (
        <div className={joinClassNames(styles.Spinner, className)}>
            <PreloaderIcon />
        </div>
    );
}

export {
    Preloader,
}