import {HttpStatus} from "../core/http/HttpStatus";
import {GetUserDataType} from "./currentUserApi";


function getUsersData(userIds: Array<string>): Promise<Array<GetUserDataType>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    username: 'user 1',
                    avatarUrl: '',
                    email: 'email@mail.ru',
                    phone: '89021025370',
                    firstName: 'Эльдар',
                    lastName: 'Мухаметханов',
                },
                {
                    id: '2',
                    username: 'user 2',
                    avatarUrl: '',
                    email: 'email@mail.ru',
                    phone: '89021025370',
                    firstName: 'Эльдар',
                    lastName: 'Мухаметханов',
                },
                {
                    id: '3',
                    username: 'user 3',
                    avatarUrl: '',
                    email: 'email@mail.ru',
                    phone: '89021025370',
                    firstName: 'Эльдар',
                    lastName: 'Мухаметханов',
                },
                {
                    id: '4',
                    username: 'user 4',
                    avatarUrl: '',
                    email: 'email@mail.ru',
                    phone: '89021025370',
                    firstName: 'Эльдар',
                    lastName: 'Мухаметханов',
                },
                {
                    id: '5',
                    username: 'user 5',
                    avatarUrl: '',
                    email: 'email@mail.ru',
                    phone: '89021025370',
                    firstName: 'Эльдар',
                    lastName: 'Мухаметханов',
                },
                {
                    id: '6',
                    username: 'user 6',
                    avatarUrl: '',
                    email: 'email@mail.ru',
                    phone: '89021025370',
                    firstName: 'Эльдар',
                    lastName: 'Мухаметханов',
                },
            ])
        }, 1000)
    })
    // return fetch('/get/users_data', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         ids: userIds,
    //     })
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 // goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response.status)
    //         }
    //     })
}


const UsersApi = {
    getUsersData,
}

export {
    UsersApi,
}