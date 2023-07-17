import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/articles'
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue')
        },
        {
            path: '/articles',
            component: () => import('@/views/articles/articles.vue'),
        },
        {
            path: '/categories',
            component: () => import('@/views/categories/categories.vue')
        },
        {
            path: '/tags',
            component: () => import('@/views/tags/tags.vue')
        },
        {
            name: 'Add',
            path: '/add',
            component: () => import('@/views/add-article/add-article.vue')
        },
        {
            name: 'Edit',
            path: '/edit/:id',
            component: () => import('@/views/edit-article/edit-article.vue')
        },
    ]
})

export default router