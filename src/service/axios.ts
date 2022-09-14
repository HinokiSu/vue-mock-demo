import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 3600,
})
export const getRequest = (url: string, params?: Object) =>
  service
    .get(url, params)
    .then((res) => res)
    .catch((err) => {
      console.log(`Get Err: ${err}`)
    })

export const postRequest = (url: string, data?: Object) =>
  service
    .post(url, data)
    .then((res) => res)
    .catch((err) => {
      console.log(`Post Err: ${err}`)
    })
