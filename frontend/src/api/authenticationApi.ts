
function registration(email: string, password: string, nickname: string): Promise<Response> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({ code: 200 });
        }, 2000);
    });

    promise
        .then((resp) => resp.json())
        .then((data) => {
            if (data.token) {
                saveToken(data.token);
            }
        })
        .catch((err) => {
            // ошибка
        });

    return promise;
}


function logIn(login: string, password: string): Promise<Response> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({ code: 200 });
        }, 2000);
    });

    promise
        .then((resp) => resp.json())
        .then((data) => {
            if (data.token) {
                saveToken(data.token);
            }
        })
        .catch((err) => {
            // ошибка
        });

    return promise;
}

function logOut(): Promise<Response> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({ code: 200 });
        }, 2000);
    });
    removeToken();
    return promise;
}

type GetUserDataType = {
    email: string;
    firstname: string;
    id: string;
    lastname: string;
};

function getUserData(): Promise<GetUserDataType> {
    const token = getToken();
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({ code: 200 });
        }, 2000);
    });

    return promise
        .then((resp) => {
            return resp.json();
        });
}

function saveToken(token: string): void {
    localStorage.setItem('token', token);
}

function getToken(): string {
    return localStorage.getItem('token') || '';
}

function removeToken(): void {
    localStorage.removeItem('token');
}

const AuthenticationApi = {
    logIn,
    logOut,
    getUserData,
    registration,
};

export {
    AuthenticationApi,
    getToken,
}
export type {
    GetUserDataType,
}