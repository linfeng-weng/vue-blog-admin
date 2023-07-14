import http from '../request/index'

export function addArticle(data) {
    return http.post({
        url: '/articles',
        data: {
            ...data
        }
    })
}

export function getArticle(page) {
   return http.get({
    url: '/articles',
    params: {
        page
    }
   })
}

export function deleteArticle(id) {
    return http.delete({
        url: `/article/${id}`
    })
}

export function updateArticle(id) {
    return http.patch({
        url: `/article/${id}`
    })
}