function registration(email: string, password: string, nickname: string): Promise<Response> {
    return fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: nickname,
            password,
            email,
        }),
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    return Promise.resolve(response)
                default:
                    return Promise.reject(response.status)
            }
        })
}

function logIn(login: string, password: string): Promise<Response> {
    return fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    return Promise.resolve(response)
                default:
                    return Promise.reject(response.status)
            }
        })
}

function logOut(): Promise<Response> {
    return fetch('http://localhost:8000/logout', {
        method: 'POST',
    })
}

type GetUserDataType = {
    id: string,
    email: string,
    nickname: string,
    avatarUrl: string,
    phone: string,
    firstName: string,
    lastName: string,
};

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

const AuthenticationApi = {
    logIn,
    logOut,
    getUserData,
    registration,
};

export {
    AuthenticationApi,
}
export type {
    GetUserDataType,
}