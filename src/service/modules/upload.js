import http from '../request/index'

export function uploadFile(file) {
    return http.post({
        url: '/uploads',
        data: file
    }) 
}