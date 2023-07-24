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

export function judgeToken() {
    return http.get({
        url: '/user/'
    })
}