import http from '../request/index'

export function userLogin(username, password) {
    return http.get({
        url: '/user/login',
        params: {
            username,
            password
        }
    }) 
}