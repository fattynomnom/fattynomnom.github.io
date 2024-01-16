import { createRouter, createWebHistory } from 'vue-router'

import posts from '@/docs/generated.json'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        ...posts.map(({ title, date, slug, fileName }) => ({
            path: `/${slug}`,
            name: slug,
            meta: { isPost: true, date, title },
            component: () => import(`@/docs/${fileName.replace('.md', '')}.md`)
        }))
    ]
})

export default router
