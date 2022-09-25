import { defineStore } from 'pinia'
import { getRequest, postRequest } from '../service/axios'
import { removeToken, setToken } from '../utils/auth'
import { ILoginForm } from './types'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    name: '',
    roles: [],
    token: '',
  }),

  getters: {
    getRoles: (state) => state.roles,
  },
  actions: {
    // 登录
    login(userInfo: ILoginForm) {
      const { username, password } = userInfo

      return new Promise((resolve, reject) => {
        postRequest('/user/login', {
          username: username.trim(),
          password: password,
        })
          .then((response) => {
            const { data }: any = response
            this.token = data['data'].token
            // set Token
            setToken(data['data'].token)
            resolve('login success')
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 获取用户信息
    getInfo(): Promise<any> {
      return new Promise((resolve, reject) =>
        getRequest(`/user/info`, {
          params: {
            token: this.token,
          },
        })
          .then((response) => {
            let { data } = response as any
            data = data.data
            if (!data) {
              reject('验证失败，请重新登录')
            }
            const { roles, name } = data
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles必须是一个不为空的数组')
            }

            this.name = name
            this.roles = roles

            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      )
    },

    // 登出
    logout() {
      return new Promise((resolve, reject) => {
        postRequest('/user/logout')
          .then(() => {
            this.token = ''
            this.roles = []
            removeToken()
            resolve('logout success')
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 重置token
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve('reset token success')
      })
    },
  },
})
