import { createRouter, createWebHistory } from "vue-router"
import { messagePrompt } from "@/utils/messagePrompt"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home/articles'
        },
        {   
            name: 'Login' ,
            path: '/login',
            component: () => import('@/views/login/login.vue')
        },
        {   
            name: 'Home',
            path: '/home',
            component: () => import('@/views/home/home.vue'),
            redirect: '/home/articles',
            children: [
                {   
                    name: 'Articles',
                    path: 'articles',
                    component: () => import('@/views/articles/articles.vue'),
                },
                {
                    name: 'Categories',
                    path: 'categories',
                    component: () => import('@/views/categories/categories.vue')
                },
                {
                    name: 'Tags',
                    path: 'tags',
                    component: () => import('@/views/tags/tags.vue')
                },
                {
                    name: 'Add',
                    path: 'add',
                    component: () => import('@/views/add-article/add-article.vue')
                },
                {
                    name: 'Edit',
                    path: 'edit/:id',
                    component: () => import('@/views/edit-article/edit-article.vue')
                },
            ]
        },
        
    ]
})


// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.name !== 'Login' && !token) {
        messagePrompt('请先登录！')
        next({ name: 'Login' })
    }else {
        next()
    }
  })
  

export default router