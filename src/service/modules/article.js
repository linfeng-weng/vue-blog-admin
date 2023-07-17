import http from '../request/index'

export function addArticle(data) {
    return http.post({
        url: '/articles',
        data,
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

export function getArticleById(id) {
    return http.get({
        url:  `/articles/${id}`
    })
}

export function deleteArticle(id) {
    return http.delete({
        url: `/articles/${id}`
    })
}

export function updateArticle(id, data) {
    return http.patch({
        url: `/articles/${id}`,
        data,
    })
}