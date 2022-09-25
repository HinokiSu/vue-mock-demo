import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    redirect: '/permission/page',
    meta: {
      hidden: false,
      title: 'Permission',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'page',
        name: 'PagePermission',
        component: () => import('@/views/permission/page.vue'),
        meta: {
          hidden: false,
          title: 'Page Permission',
        },
      },
      {
        path: 'role',
        name: 'RolePermission',
        component: () => import('@/views/permission/role.vue'),
        meta: {
          hidden: false,
          title: 'Role Permission',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    name: 'Test',
    meta: {
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/index.vue'),
        meta: {
          hidden: false,
          title: 'Test',
        },
      },
    ],
  },
]
