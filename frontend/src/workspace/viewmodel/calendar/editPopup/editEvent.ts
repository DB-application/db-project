import {combine, declareAction} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";


const open = declareAction()
const close = declareAction()
const [showAtom, setShow] = declareAtomWithSetter('editPopup', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const editEventAtom = combine({
    show: showAtom,
})

const editEventActions = {
    setShow,
    open,
    close,
}

export {
    editEventAtom,
    editEventActions,
}