import http from '../request/index'

export function userLogin(username, password) {
    return http.post({
        url: '/user/login',
        data: {
            username,
            password
        }
    }) 
}