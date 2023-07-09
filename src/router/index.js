import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home/articles'
        },
        {
            path: '/home',
            redirect: '/home/articles',
            component: () => import('@/views/home/home.vue'),
            children: [
                {
                    path: 'articles',
                    component: () => import('@/views/articles/articles.vue')
                },
                {
                    path: 'categories',
                    component: () => import('@/views/categories/categories.vue')
                },
                {
                    path: 'tags',
                    component: () => import('@/views/tags/tags.vue')
                },
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue')
        }
    ]
})

export default router