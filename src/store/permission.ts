import { defineStore } from 'pinia'
import { asyncRoutes } from '../routes/async-routes'
import { constantRoutes } from '../routes/constant-routes'

interface IState {
  routes: Array<any>
  addRoutes: Array<any>
}

export const usePermissionStore = defineStore('permission', {
  state: (): IState => ({
    routes: [],
    addRoutes: [],
  }),

  getters: {},
  actions: {
    // 根据roles生成 可访问的路由Map
    generateRoutes(roles: Array<any>): Promise<any> {
      return new Promise((resolve) => {
        let accessedRoutes

        // 判断roles是否包含admin
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          // 无admin，则过滤路由
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    },
  },
})

// 判断是否有权限， 依据 meta.role
const hasPermission = (roles: Array<any>, route: any) => {
  // route中是否有meta属性 是否有meta.roles属性
  if (route.meta && route.meta.roles) {
    // 当roles的有一个元素 在 有 route.meta.roles中存在
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    // 没有meta属性和meta.roles属性，则说明无权限要求
    return true
  }
}

const filterAsyncRoutes = (routes: Array<any>, roles: Array<any>) => {
  // 初始化结果数组
  let res: Array<any> = []

  routes.forEach((route: Object) => {
    // 拷贝一份
    const tmp: any = { ...route }

    if (hasPermission(roles, tmp)) {
      // 判断是否存在 子路由
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
