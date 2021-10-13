import {GetUserDataType} from "./authenticationApi";

type Api_UserInfo = {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    nickname: string,
    phoneNumber: string
}

function setUserInfo(userInfo: Api_UserInfo): Promise<Response> {
    return fetch('http://localhost:8000/update/user_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    return Promise.resolve(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type ChangePasswordBody = {
    userId: string,
    oldPassword: string,
    newPassword: string,
}

function changePassword(body: ChangePasswordBody): Promise<Response> {
    return fetch('http://localhost:8000/update/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    return Promise.resolve(response)
                default:
                    return Promise.reject(response)
            }
        })
}


function getUserData(): Promise<GetUserDataType> {
    return  fetch('http://localhost:8000/get/user', {
        method: 'POST',
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json()
                default:
                    return Promise.reject(response.status)
            }
        })
}


const UserApi = {
    getUserData,
    changePassword,
    setUserInfo,
}

export {
    UserApi,
}
export type {
    Api_UserInfo,
    ChangePasswordBody,
}