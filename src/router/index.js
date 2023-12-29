import Vue from "vue";
import Router from "vue-router";

import CommonStorageBase from "@/components/storage/CommonStorageBase";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('../components/pages/Index.vue'),
        },
        {
            path: '/organization',
            component: () => import('../components/pages/OrganizationChartChat.vue'),
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/definitions',
            component: () => import('../components/pages/ProcessManagerChat.vue'),
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/definitions/:id',
            component: () => import('../components/pages/ProcessManagerChat.vue'),
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/instances',
            component: () => import('../components/pages/ProcessParticipantChat.vue'),
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/instances/:id',
            component: () => import('../components/pages/ProcessParticipantChat.vue'),
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/todolist',
            component: () => import('../components/ui/TodolistGrid.vue'),
            meta: {
                requiresAuth: true
            },
        },
    ]
});

router.beforeEach(async (to, from, next) => {
    const storage = new CommonStorageBase(this);
    await storage.loginUser();
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!storage.isLogin) {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
