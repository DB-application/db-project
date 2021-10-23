import {Portal} from "./Portal";


type PropsType = {
    binding: JSX.Element,
    show: boolean,
    close: () => void,
}

function PopupPortal({
    show,
    close,
    binding,
}: PropsType) {
    if (!show) {
        return null
    }
    return (
        <Portal
            parentId={'popup'}
            children={binding}
        />
    )
}

export {
    PopupPortal,
}