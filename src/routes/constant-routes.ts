import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
// 基本路由，无权限设置
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: 'Login',
      hidden: true,
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      hidden: false,
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          hidden: false,
          title: 'Dashboard',
        },
      },
    ],
  },
  {
    path: '/guide',
    component: Layout,
    name: 'Guide',
    redirect: '/guide/index',
    meta: {
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          hidden: false,
          title: 'Guide',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      title: 'Profile',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  /*  {
    // 必须使用带有自定义正则表达式的参数来定义捕获所有路由
    // https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/views/404.vue'),
  }, */
]
