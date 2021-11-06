import {UserData} from "../common/UserData";
import {declareMapAtom} from "../core/reatom/declareMapAtom";

const {
    atom: usersAtom,
    updateItems: updateUsers,
    removeItems: removeUsers,
    updateItem: updateUser,
} = declareMapAtom<UserData>(
    'usersAtom',
    user => user.id,
)

const usersActions = {
    removeUsers,
    updateUser,
    updateUsers,
}

export {
    usersAtom,
    usersActions,
}