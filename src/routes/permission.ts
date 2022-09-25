import { router } from '.'
import Nprogress from 'nprogress'
import { usePermissionStore, useUserStore } from '../store'
import { getToken } from '../utils/auth'
import { RouteRecordRaw } from 'vue-router'

Nprogress.configure({ showSpinner: true })

// 路由白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  Nprogress.start()

  // token
  // ...
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      Nprogress.done()
    } else {
      // 从useUserStore中获取 roles
      const hasRoles = useUserStore().roles && useUserStore().roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          const { roles } = await useUserStore().getInfo()
          // 基于roles 生成 可访问的路由Map
          const accessRoutes = await usePermissionStore().generateRoutes(roles)
          // 动态添加 可访问的路由

          // router.addRoutes(accessRoutes)  由于4.x中已废除addRoutes方法
          // TODO: 考虑含有children的情况
          accessRoutes.forEach((route: any) => {
            router.addRoute({
              path: route.path,
              name: route.name,
              component: route.component,
              meta: route.meta,
              children: route.children,
            })
          })
          // hack addRoute路由时完整的
          // 由于守卫是异步执行的，需要确保动态添加的路由已经完全加载上去
          // replace:true 导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (err) {
          // 移除token 并 跳转至login页面
          await useUserStore().resetToken()
          console.log('Has Error:' + err)
          next(`/login?redirect=${to.path}`)
          Nprogress.done()
        }
      }
    }
  } else {
    /* 没有token */
    // 将要前往的path在 whiteList中
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 中断当前导航，重定向到新导航
      next(`/login?redirect=${to.path}`)
      Nprogress.done()
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})
