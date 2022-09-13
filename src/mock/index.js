import Mock from 'mockjs'
import user from './user'
// 当get请求到 /api/data 路由时 Mock会拦截请求并返回上面的数据
import { param2Obj } from './utils'
const mocks = [...user]

function expressReqWrap(respond) {
  return function (options) {
    let result = null

    if (respond instanceof Function) {
      const { body, type, url } = options

      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url),
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

function createMock() {
  for (const i of mocks) {
    // url使用正则 当get请求传参时 可以拦截
    Mock.mock(new RegExp(i.url), i.type || 'get', expressReqWrap(i.response))
  }
}

createMock()
