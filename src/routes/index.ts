import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './constant-routes'

const routes = <RouteRecordRaw[]>[...constantRoutes]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
