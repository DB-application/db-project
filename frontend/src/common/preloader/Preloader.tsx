import styles from './Prealoder.module.css'
import {BxLoaderAltIcon} from "../../icons/BxLoaderAltIcon";
import {joinClassNames} from "../../core/styles/joinClassNames";

type PreloaderProps = {
    className?: string,
    preloaderColor?: string,
}

function PreloaderIcon() {
    return (
        <div>
            <BxLoaderAltIcon/>
        </div>
    )
}

function Preloader({
    className,
    preloaderColor = 'black'
}: PreloaderProps) {
    return (
        <div className={joinClassNames(styles.Spinner, className)} style={{color: preloaderColor}}>
            <PreloaderIcon />
        </div>
    );
}

export {
    Preloader,
}