import {HttpStatus} from "../core/http/HttpStatus";
import {GetUserDataType} from "./currentUserApi";


function getUsersData(userIds: Array<string>): Promise<Array<GetUserDataType>> {
    return fetch('/get/users_data', {
        method: 'POST',
        body: JSON.stringify({
            ids: userIds,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    // goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response.status)
            }
        })
}


const UsersApi = {
    getUsersData,
}

export {
    UsersApi,
}