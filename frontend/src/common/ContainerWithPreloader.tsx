import {useMemo, useRef} from "react";
import {Preloader} from "./preloader/Preloader";

type ContainerWithPreloaderProps = {
    isPopupLoading: boolean,
    content: JSX.Element,
    className?: string,
}

function ContainerWithPreloader({
    isPopupLoading,
    content,
    className,
}: ContainerWithPreloaderProps) {
    const containerRef = useRef<HTMLDivElement|null>(null)

    const binding = isPopupLoading
        ? <Preloader />
        : content

    const style = useMemo(() => {
        if (isPopupLoading && containerRef.current) {
            return {
                height: containerRef.current.getBoundingClientRect().height
            }
        }
    }, [containerRef, isPopupLoading])

    return (
        <div
            className={className}
            ref={containerRef}
            style={style}
        >
            {binding}
        </div>
    )
}

export {
    ContainerWithPreloader,
}