import styles from './Prealoder.module.css'
import {BxLoaderAltIcon} from "../../icons/BxLoaderAltIcon";
import {joinClassNames} from "../../core/styles/joinClassNames";

type PreloaderProps = {
    className?: string,
    preloaderColor?: string,
}

type PreloaderIconProps = {
    className?: string,
}

function PreloaderIcon({
    className,
}: PreloaderIconProps) {
    return <BxLoaderAltIcon className={joinClassNames(styles.spinner, className)} />
}

function Preloader({
    className,
    preloaderColor = 'black'
}: PreloaderProps) {
    return (
        <div className={joinClassNames(styles.spinnerContainer, className)} style={{color: preloaderColor}}>
            <PreloaderIcon />
        </div>
    );
}

export {
    Preloader,
    PreloaderIcon,
}