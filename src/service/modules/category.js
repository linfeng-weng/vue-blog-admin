import http from '../request/index'

export function addCategory(name) {
    return http.post({
        url: '/categories',
        data: {
            name
        }
    })
}

export function getCategory() {
    return http.get({
        url: '/categories',
    })
}

export function deleteCategory(id) {
    return http.delete({
        url: `/categories/${id}`,
    })
}