const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}
const users = {
  'admin-token': {
    id: 1,
    name: 'Super Admin',
    roles: ['admin'],
  },
  'editor-token': {
    id: 2,
    name: 'Editor John',
    roles: ['editor'],
  },
}

export default [
  // 用户登录
  {
    url: '/user/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body
      // 根据字符串索引到 对应的值
      const token = tokens[username]

      if (!token) {
        return {
          code: 10403,
          message: '账户和密码不正确',
        }
      }
      return {
        code: 20000,
        data: token,
      }
    },
  },

  // 获取 用户信息

  {
    url: '/user/info',
    type: 'get',
    response: (config) => {
      const { token } = config.query
      // 从users中 根据token字符串索引到 对应的元素
      const info = users[token]

      if (!info) {
        return {
          code: 10001,
          message: '登录失败,无法获取用户信息',
        }
      }
      return {
        code: 20000,
        data: info,
      }
    },
  },

  // 用户退出登录
  {
    url: '/user/logout',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
]
