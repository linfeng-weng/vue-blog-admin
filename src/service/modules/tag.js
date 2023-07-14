import http from '../request/index'

export function addTag(name) {
    return http.post({
        url: '/tags',
        data: {
            name
        }
    })
}

export function getTag() {
    return http.get({
        url: '/tags'
    })
}

export function deleteTag(id) {
    return http.delete({
        url: `/tags/${id}`
    })
}